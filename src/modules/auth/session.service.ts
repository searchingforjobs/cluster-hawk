import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { SessionInfoDto } from './dto/session-info.dto';
import { Request } from 'express';
import * as UAParser from 'ua-parser-js';
import { ApiException } from '../../shared/exceptions/api.exception';

@Injectable()
export class SessionService {
  private readonly parser: UAParser;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    this.parser = new UAParser();
  }

  parseSessionInfo(request: Request) {
    const userAgent = request.headers['user-agent'];
    const ip = request.ip;
    const data = this.parser.setUA(userAgent).getResult();
    return new SessionInfoDto(ip, data);
  }

  async createOrReplace(
    user: User,
    sessionInfo: SessionInfoDto,
    refreshToken: string,
  ) {
    let session = user.sessionRefreshTokens?.find(
      (session) =>
        session.ip == sessionInfo.ip &&
        session.browserName == sessionInfo.browserName,
    );

    if (session) {
      session.refreshTokenHash = refreshToken;
      session.refreshTokenUpdatedAt = new Date();
    } else {
      session = {
        ...sessionInfo,
        user: user,
        refreshTokenHash: refreshToken,
        refreshTokenUpdatedAt: new Date(),
      };
      user.sessionRefreshTokens = [];
    }

    const updatedSessions = [...user.sessionRefreshTokens, session];

    const updatedUser = {
      ...user,
      sessionRefreshTokens: updatedSessions,
    };

    const savedUser = await this.usersRepository.save(updatedUser);
    return savedUser;
  }

  async invalidate(user: User, sessionInfo: SessionInfoDto) {
    const userSession = user.sessionRefreshTokens?.find(
      (session) =>
        session.ip == sessionInfo.ip &&
        session.browserName == sessionInfo.browserName,
    );

    if (!userSession) {
      throw ApiException.NotFound('Session not found!');
    }

    userSession.refreshTokenHash = null;
    userSession.refreshTokenUpdatedAt = new Date();

    const otherSessions = user.sessionRefreshTokens.filter(
      (session) =>
        session.ip != userSession.ip &&
        session.browserName != userSession.browserName,
    );

    const updatedUser = {
      ...user,
      sessionRefreshTokens: [...otherSessions, userSession],
    };

    const savedUser = await this.usersRepository.save(updatedUser);
    console.log('invalidated', savedUser);
    return savedUser;
  }

  async invalidateAll(user: User) {
    const userSessions = user.sessionRefreshTokens?.map((session) => ({
      ...session,
      refreshToken: null,
      refreshTokenUpdatedAt: new Date(),
    }));

    if (!userSessions) {
      throw ApiException.NotFound();
    }

    const updatedUser = {
      ...user,
      sessionRefreshTokens: userSessions,
    };

    const savedUser = await this.usersRepository.save(updatedUser);
    console.log('invalidated', savedUser);
    return savedUser;
  }
}

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiException } from '../../shared/exceptions/api.exception';
import { ConfigService } from '@nestjs/config';
import { IUserIdentity } from '../users/interfaces';
import { Response } from 'express';
import { CookiesConfig } from './config/cookies.config';

export class TokenService {
  private readonly accessTokenSecret;
  private readonly refreshTokenSecret;
  private readonly accessTokenExpiration;
  private readonly refreshTokenExpiration;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    const accessTokenSecret =
      this.configService.get<string>('JWT_ACCESS_SECRET');
    const refreshTokenSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!accessTokenSecret || !refreshTokenSecret) {
      throw ApiException.InternalServerError();
    }

    const accessTokenExpiration = this.configService.get<string>(
      'JWT_ACCESS_EXPIRATION',
    );
    const refreshTokenExpiration = this.configService.get<string>(
      'JWT_REFRESH_EXPIRATION',
    );

    this.accessTokenSecret = accessTokenSecret;
    this.accessTokenExpiration = accessTokenExpiration || '10m';
    this.refreshTokenSecret = refreshTokenSecret;
    this.refreshTokenExpiration = refreshTokenExpiration || '2h';
  }

  generateTokenPair(user: User) {
    const payload: IUserIdentity = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.accessTokenSecret,
        expiresIn: this.accessTokenExpiration,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.refreshTokenSecret,
        expiresIn: this.refreshTokenExpiration,
      }),
    };
  }

  async respondWithTokens(response: Response, tokenPair) {
    response.cookie(CookiesConfig.REFRESH_TOKEN_KEY, tokenPair.refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
    });

    return { accessToken: tokenPair.accessToken };
  }
}

import { Injectable } from '@nestjs/common';
import { ApiException } from '../../shared/exceptions/api.exception';
import { UsersService } from '../users/users.service';
import { MailingService } from './mailing.service';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { TokenService } from './token.service';
import { UserDto } from '../users/dto/user.dto';
import { UserStatus } from '../users/interfaces';
import { SessionInfoDto } from './dto/session-info.dto';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  private readonly salt;

  constructor(
    private usersService: UsersService,
    private mailingService: MailingService,
    private tokenService: TokenService,
    private configService: ConfigService,
    private sessionsService: SessionService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    const passwordSalt = this.configService.get<number>('PASSWORD_SALT');
    this.salt = Number(passwordSalt) || 4;
  }

  private async getUserByCredentials(dto: AuthCredentialsDto) {
    if (!dto.email && !dto.username) {
      throw ApiException.BadRequest('Empty credentials');
    } else if (dto.email && dto.username) {
      throw ApiException.BadRequest('Ambiguous request: redundant data');
    }

    let user = null;

    if (dto.email) {
      user = await this.usersService.getUserByEmail(dto.email);
    } else if (dto.username) {
      user = await this.usersService.getUserByUsername(dto.username);
    }
    return user;
  }

  private async isUserAuthenticated(
    dto: AuthCredentialsDto,
    user: User,
  ): Promise<boolean> {
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    return !!passwordEquals;
  }

  async registration(dto: CreateUserDto, sessionInfo: SessionInfoDto) {
    const emailTaken = await this.isEmailTaken(dto.email);
    const usernameTaken = await this.isUsernameTaken(dto.username);

    if (emailTaken && usernameTaken) {
      throw ApiException.BadRequest('Email and username already taken');
    } else if (emailTaken) {
      throw ApiException.BadRequest('Email already taken');
    } else if (usernameTaken) {
      throw ApiException.BadRequest('Username already taken');
    }

    const passwordHash = await bcrypt.hash(dto.password, this.salt);

    let user = await this.usersService.create({
      ...dto,
      password: passwordHash,
    });

    const tokenPair = this.tokenService.generateTokenPair(user);

    const activationLinkToken = uuid.v4();
    const activationLink = `${process.env.API_URL}/users/activate${activationLinkToken}`;

    await this.mailingService.sendActivationLink(user.email, activationLink);

    const refreshTokenHash = await bcrypt.hash(
      tokenPair.refreshToken,
      this.salt,
    );

    user = await this.sessionsService.createOrReplace(
      user,
      sessionInfo,
      refreshTokenHash,
    );

    user.activationLink = activationLinkToken;

    await this.usersRepository.save(user);

    return tokenPair;
  }

  async login(dto: AuthCredentialsDto, sessionInfo: SessionInfoDto) {
    let user: User = await this.getUserByCredentials(dto);

    if (!user) {
      throw ApiException.Unauthorized();
    }

    const authAttemptsInfo = await this.usersService.getAuthAttemptsInfo(
      user.id,
    );

    const notEnoughTimePassed =
      +new Date() - +authAttemptsInfo.lastAuthAttemptAt < 5 * 60 * 1000;

    if (notEnoughTimePassed) {
      if (authAttemptsInfo.failedAttempts >= 5) {
        throw ApiException.Forbidden(
          `The number of login attempts used up. Please try again later.`,
        );
      }
    } else {
      user.failedAttempts = 0;
    }

    const authenticated = await this.isUserAuthenticated(dto, user);

    if (authenticated) {
      user.failedAttempts = 0;
      user.lastAuthAttemptAt = new Date();

      const tokenPair = this.tokenService.generateTokenPair(user);

      const refreshTokenHash = await bcrypt.hash(
        tokenPair.refreshToken,
        this.salt,
      );

      user = await this.sessionsService.createOrReplace(
        user,
        sessionInfo,
        refreshTokenHash,
      );

      await this.usersRepository.save(user);

      return tokenPair;
    } else {
      user.failedAttempts = user.failedAttempts + 1;
      user.lastAuthAttemptAt = new Date();
      await this.usersRepository.save(user);
    }

    throw ApiException.Unauthorized();
  }

  async activate(link: string) {
    const user = await this.usersRepository.findOne({
      where: {
        activationLink: link,
      },
    });

    if (user) {
      if (user.status == UserStatus.ACTIVE) {
        throw ApiException.BadRequest('User account already activated');
      }

      user.status = UserStatus.ACTIVE;
      await this.usersRepository.save(user);

      return new UserDto(user);
    }

    throw ApiException.BadRequest('Incorrect link');
  }

  async refresh(userId: string, sessionInfo: SessionInfoDto) {
    if (!userId) {
      throw ApiException.BadRequest();
    }

    let user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    const tokenPair = this.tokenService.generateTokenPair(user);

    user = await this.sessionsService.createOrReplace(
      user,
      sessionInfo,
      tokenPair.refreshToken,
    );

    await this.usersRepository.save(user);

    return tokenPair;
  }

  async logout(userId: string, sessionInfo: SessionInfoDto) {
    if (!userId) {
      throw ApiException.BadRequest();
    }
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        sessionRefreshTokens: true,
      },
    });

    const updatedUser = await this.sessionsService.invalidate(
      user,
      sessionInfo,
    );
    await this.usersRepository.save(updatedUser);

    return new UserDto(updatedUser);
  }

  async logoutAll(userId: string) {
    if (!userId) {
      throw ApiException.BadRequest();
    }

    let user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        sessionRefreshTokens: true,
      },
    });

    user = await this.sessionsService.invalidateAll(user);
    await this.usersRepository.save(user);

    return new UserDto(user);
  }

  async isEmailTaken(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    return !!user;
  }

  async isUsernameTaken(username: string) {
    const user = await this.usersService.getUserByUsername(username);
    return !!user;
  }
}

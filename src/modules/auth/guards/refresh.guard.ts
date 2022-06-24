import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiException } from '../../../shared/exceptions/api.exception';
import { CookiesConfig } from '../config/cookies.config';
import { UsersService } from '../../users/users.service';
import { IUserIdentity } from '../../users/interfaces';
import { SessionService } from '../session.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  private readonly refreshTokenSecret: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
    private sessionService: SessionService,
  ) {
    const refreshTokenSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!refreshTokenSecret) {
      throw ApiException.InternalServerError();
    }

    this.refreshTokenSecret = refreshTokenSecret;
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const authCookie = request.cookies?.[CookiesConfig.REFRESH_TOKEN_KEY];
    const sessionInfo = this.sessionService.parseSessionInfo(request);

    if (!authCookie) {
      throw ApiException.Forbidden();
    }

    const userIdentity: IUserIdentity = this.jwtService.verify(authCookie, {
      secret: this.refreshTokenSecret,
    });

    const user = await this.usersService.findOne(userIdentity.id);

    const session = user.sessionRefreshTokens?.find(
      (session) =>
        session.refreshTokenHash &&
        session.ip == sessionInfo.ip &&
        session.browserName == sessionInfo.browserName,
    );

    if (session) {
      let refreshTokensEquals = null;

      try {
        refreshTokensEquals = await bcrypt.compare(
          authCookie,
          session.refreshTokenHash,
        );
      } catch (error) {
        throw ApiException.InternalServerError();
      }

      if (refreshTokensEquals) {
        request.user = userIdentity;
      } else {
        throw ApiException.Unauthorized();
      }
    } else {
      throw ApiException.Unauthorized();
    }

    return true;
  }
}

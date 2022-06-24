import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiException } from '../../../shared/exceptions/api.exception';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly accessTokenSecret: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const accessTokenSecret =
      this.configService.get<string>('JWT_ACCESS_SECRET');

    if (!accessTokenSecret) {
      throw ApiException.InternalServerError();
    }

    this.accessTokenSecret = accessTokenSecret;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw ApiException.Unauthorized();
      }

      const user = this.jwtService.verify(token, {
        secret: this.accessTokenSecret,
      });
      request.user = user;

      return true;
    } catch (error) {
      throw ApiException.Unauthorized();
    }
  }
}

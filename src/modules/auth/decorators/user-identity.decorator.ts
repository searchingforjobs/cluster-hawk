import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { IJwtPayload } from '../../users/interfaces';

export const UserIdentity = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    if (request && request.user) {
      return request.user;
    }
    throw new UnauthorizedException({ message: 'User unauthorized' });
  },
);

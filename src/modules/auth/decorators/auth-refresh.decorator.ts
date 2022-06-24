import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiForbiddenResponse } from '@nestjs/swagger';
import { CookiesConfig } from '../config/cookies.config';
import { JwtRefreshGuard } from '../guards/refresh.guard';

export function AuthRefresh() {
  return applyDecorators(
    UseGuards(JwtRefreshGuard),
    ApiCookieAuth(CookiesConfig.REFRESH_TOKEN_KEY),
    ApiForbiddenResponse({ description: 'Forbidden' }),
  );
}

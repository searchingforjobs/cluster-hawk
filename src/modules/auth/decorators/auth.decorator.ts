import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function AuthRequired() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth('Access token'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

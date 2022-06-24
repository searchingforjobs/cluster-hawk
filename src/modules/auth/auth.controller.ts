import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRequired } from './decorators/auth.decorator';
import { UserIdentity } from './decorators/user-identity.decorator';
import { AuthRefresh } from './decorators/auth-refresh.decorator';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { IUserIdentity } from '../users/interfaces';
import { TokenService } from './token.service';
import { SessionService } from './session.service';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('/registration')
  @UsePipes(ValidationPipe)
  @Throttle(5, 10)
  @ApiOperation({ summary: 'Register new account' })
  @ApiResponse({ status: 200, description: 'Successful registration' })
  async registration(
    @Body() dto: CreateUserDto,
    @Req() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const sessionData = this.sessionService.parseSessionInfo(request);
    const tokenPair = await this.authService.registration(dto, sessionData);
    return this.tokenService.respondWithTokens(response, tokenPair);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  @Throttle(5, 10)
  @ApiOperation({
    summary: 'Authorize and get access and refresh token',
    description:
      'Cookies a new refresh token, invalidates the old refresh token, and provides a new access token in the response body',
  })
  @ApiResponse({ status: 200 })
  async login(
    @Body() dto: AuthCredentialsDto,
    @Req() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const sessionData = this.sessionService.parseSessionInfo(request);
    const tokenPair = await this.authService.login(dto, sessionData);
    return this.tokenService.respondWithTokens(response, tokenPair);
  }

  @Post('/logout')
  @AuthRequired()
  @UsePipes(ValidationPipe)
  @Throttle(2, 1)
  @ApiOperation({
    summary: 'Invalidate refresh token',
    description: 'Invalidates stored refresh token',
  })
  @ApiResponse({ status: 200 })
  logout(@UserIdentity() userIdentity: IUserIdentity, @Req() request) {
    const sessionData = this.sessionService.parseSessionInfo(request);
    return this.authService.logout(userIdentity.id, sessionData);
  }

  @Post('/logout/all')
  @ApiOperation({
    summary: 'Invalidate refresh token',
    description: 'Invalidates stored refresh token',
  })
  @ApiResponse({ status: 200 })
  @AuthRequired()
  @UsePipes(ValidationPipe)
  logoutAll(@UserIdentity() userIdentity: IUserIdentity) {
    return this.authService.logoutAll(userIdentity.id);
  }

  @Get('/refresh')
  @ApiOperation({
    summary: 'Get new token pair and invalidate previous refresh token',
    description:
      'Cookies a new refresh token, invalidates the old refresh token, and provides a new access token in the response body',
  })
  @ApiResponse({ status: 200 })
  @AuthRefresh()
  @Throttle(5, 10)
  async refresh(
    @UserIdentity() userIdentity: IUserIdentity,
    @Res({ passthrough: true }) response: Response,
    @Req() request,
  ) {
    const sessionData = this.sessionService.parseSessionInfo(request);
    const tokenPair = await this.authService.refresh(
      userIdentity.id,
      sessionData,
    );
    return this.tokenService.respondWithTokens(response, tokenPair);
  }

  @Get('activate/:link')
  @Throttle(5, 10)
  activate(@Param('link') link: string) {
    return this.authService.activate(link);
  }

  @Get('check/email/:email')
  @Throttle(10, 1)
  checkEmail(@Param('email') email: string) {
    return this.authService.isEmailTaken(email);
  }

  @Get('check/username/:username')
  @Throttle(10, 1)
  checkUsername(@Param('username') username: string) {
    return this.authService.isUsernameTaken(username);
  }
}

import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { MailingService } from './mailing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { TokenService } from './token.service';
import { SessionService } from './session.service';
import { SessionRefreshToken } from './entities/session-refresh-tokens.entity';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    MailingService,
    ConfigService,
    TokenService,
    SessionService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, SessionRefreshToken]),
    MailerModule.forRoot({
      transport: {
        host: `${process.env.SMTP_HOST}`,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: `${process.env.SMTP_USER}`,
          pass: `${process.env.SMTP_PASSWORD}`,
        },
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

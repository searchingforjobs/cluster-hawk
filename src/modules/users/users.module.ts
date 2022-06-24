import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '@nestjs/config';
import {
  BanCase,
  EmailChangeCase,
  PasswordChangeCase,
  StatusChangeCase,
  UsernameChangeCase,
} from './entities/reference';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  imports: [
    TypeOrmModule.forFeature([
      User,
      BanCase,
      StatusChangeCase,
      EmailChangeCase,
      PasswordChangeCase,
      UsernameChangeCase,
    ]),
    AuthModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}

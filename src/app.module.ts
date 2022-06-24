import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules';
import { DataSource } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  BanCase,
  EmailChangeCase,
  PasswordChangeCase,
  StatusChangeCase,
  UsernameChangeCase,
} from './modules/users/entities/reference';
import { SessionRefreshToken } from './modules/auth/entities/session-refresh-tokens.entity';
import * as fs from 'fs';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        User,
        BanCase,
        StatusChangeCase,
        EmailChangeCase,
        PasswordChangeCase,
        UsernameChangeCase,
        SessionRefreshToken,
      ],
      synchronize: true,
      dropSchema: true,
      ssl: {
        rejectUnauthorized: false,
        cert: fs.readFileSync(process.env.SSL_CERT).toString(),
      },
    }),
    ThrottlerModule.forRoot({}),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

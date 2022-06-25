import { Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { PassportController } from './passport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passport } from '../../entities/passport.entity';
import { S3Service } from '../s3/s3.service';

@Module({
  controllers: [PassportController],
  providers: [PassportService, S3Service],
  imports: [TypeOrmModule.forFeature([Passport])],
})
export class PassportModule {}

import { Module } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { S3Service } from '../s3/s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from '../../entities/attendee.entity';
import { Passport } from '../../entities/passport.entity';
import { DriverLicense } from '../../entities/driver-license.entity';
import { Profile } from '../../entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { EmbeddingsService } from '../embeddings/embeddings.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AttendeesController],
  providers: [AttendeesService, S3Service, EmbeddingsService, ConfigService],
  imports: [
    TypeOrmModule.forFeature([
      Attendee,
      User,
      Profile,
      Passport,
      DriverLicense,
    ]),
    HttpModule,
  ],
})
export class AttendeesModule {}

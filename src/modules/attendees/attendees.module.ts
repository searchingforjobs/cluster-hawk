import { Module } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { S3Service } from '../s3/s3.service';

@Module({
  controllers: [AttendeesController],
  providers: [AttendeesService, S3Service],
})
export class AttendeesModule {}

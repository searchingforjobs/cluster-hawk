import { Module } from '@nestjs/common';
import { FaceRecognitionService } from './face-recognition.service';
import { FaceRecognitionController } from './face-recognition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from '../../entities/attendee.entity';

@Module({
  controllers: [FaceRecognitionController],
  providers: [FaceRecognitionService],
  imports: [TypeOrmModule.forFeature([Attendee])],
})
export class FaceRecognitionModule {}

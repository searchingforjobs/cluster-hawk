import { Module } from '@nestjs/common';
import { FaceRecognitionService } from './face-recognition.service';
import { FaceRecognitionController } from './face-recognition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from '../../entities/attendee.entity';
import { EmbeddingsService } from '../embeddings/embeddings.service';
import { HttpModule } from '@nestjs/axios';
import { S3Service } from '../s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [FaceRecognitionController],
  providers: [
    FaceRecognitionService,
    EmbeddingsService,
    S3Service,
    ConfigService,
  ],
  imports: [TypeOrmModule.forFeature([Attendee]), HttpModule],
})
export class FaceRecognitionModule {}

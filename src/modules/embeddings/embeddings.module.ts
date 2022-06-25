import { Module } from '@nestjs/common';
import { EmbeddingsService } from './embeddings.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers: [EmbeddingsService, ConfigService],
  exports: [EmbeddingsService],
})
export class EmbeddingsModule {}

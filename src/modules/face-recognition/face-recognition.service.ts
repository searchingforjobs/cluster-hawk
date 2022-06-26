import { Injectable } from '@nestjs/common';
import { ApiException } from '../../shared/exceptions/api.exception';
import { EmbeddingsService } from '../embeddings/embeddings.service';
import { S3Service } from '../s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from '../../entities/attendee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FaceRecognitionService {
  constructor(
    private readonly embeddingsService: EmbeddingsService,
    private readonly s3Service: S3Service,
    @InjectRepository(Attendee)
    private readonly attendeesRepository: Repository<Attendee>,
  ) {}

  async recognize(buffer: Buffer) {
    const imageUrl = (await this.s3Service.upload(buffer))['Location'];
    if (imageUrl) {
      const embeddings = (
        await this.embeddingsService.getEmbeddingsByPhotoUrl(imageUrl)
      )['descriptor'];

      const candidateEmbeddings = [];

      for (const [, value] of Object.entries(embeddings)) {
        candidateEmbeddings.push(value);
      }

      console.log(`Candidate embeddings: ${candidateEmbeddings}`);

      if (!candidateEmbeddings) {
        throw ApiException.InternalServerError(
          `Candidate embeddings: ${candidateEmbeddings}`,
        );
      }

      const attendees = await this.attendeesRepository.find();

      const candidateScores = [];

      let exactMatch = null;

      attendees.forEach((attendee) => {
        if (attendee.embedding && attendee.embedding.length != 0) {
          const distance = Math.acos(
            this.embeddingsService.cosineDistance(
              attendee.embedding,
              candidateEmbeddings,
            ),
          );

          if (this.embeddingsService.interpretCosine(distance)) {
            exactMatch = attendee;
            return;
          }

          candidateScores.push({
            attendee: attendee,
            distance: distance,
            interpretation: this.embeddingsService.interpretCosine(distance),
          });
        }
      });

      if (exactMatch) return [exactMatch];
      else {
        return candidateScores
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 4);
      }
    }
    throw ApiException.BadRequest();
  }
}

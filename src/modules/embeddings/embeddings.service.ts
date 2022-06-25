import { Injectable } from '@nestjs/common';
import { Embedding } from './interfaces/embedding.interface';
import { ApiException } from '../../shared/exceptions/api.exception';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { EmbeddingsServiceResponse } from './interfaces/embeddings-service-response.interface';
import { lastValueFrom } from 'rxjs';
import { EmbeddingsDistanceReport } from './interfaces/report.interface';

@Injectable()
export class EmbeddingsService {
  private readonly cosineInterpretThreshold = 0.3;
  private readonly embeddingEndpoint;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const embeddingsServiceUrl =
      this.configService.get<string>('ML_SERVICE_URL');

    if (!embeddingsServiceUrl) {
      throw ApiException.InternalServerError();
    }
    this.embeddingEndpoint = embeddingsServiceUrl;
  }

  private euclideanNorm(vector: Embedding) {
    const sum = vector.reduce((x, aggregate) => aggregate + x * x, 0);
    return Math.sqrt(sum);
  }

  cosineDistance(vector: Embedding, another: Embedding) {
    if (vector.length != another.length) {
      throw ApiException.InternalServerError('Invalid embeddings');
    }
    let sum = 0.0;
    for (let i = 0; i < vector.length; i++) {
      sum += vector[i] * another[i];
    }
    return sum / (this.euclideanNorm(vector) * this.euclideanNorm(another));
  }

  euclideanDistance(vector: Embedding, another: Embedding) {
    return Math.abs(this.euclideanNorm(vector) - this.euclideanNorm(another));
  }

  interpretEuclidean(distance: number) {
    throw ApiException.NotImplemented();
  }

  interpretCosine(distance: number) {
    return distance < this.cosineInterpretThreshold;
  }

  report(vector: Embedding, another: Embedding): EmbeddingsDistanceReport {
    const cosine = this.cosineDistance(vector, another);
    const euclidean = this.euclideanDistance(vector, another);
    return {
      interpretation: {
        cosine: this.interpretCosine(cosine),
        cosineThreshold: this.cosineInterpretThreshold,
        euclidean: null,
        euclideanThreshold: null,
      },
      distances: {
        cosine: cosine,
        euclidean: euclidean,
      },
      embeddingsLength: vector.length,
    };
  }

  async getEmbeddingsByPhotoUrl(photoUrl: string) {
    const response = await lastValueFrom(
      this.httpService.post<EmbeddingsServiceResponse>(this.embeddingEndpoint, {
        link: photoUrl,
      }),
    );
    if (response) {
      const embedding = response.data;
      if (!embedding) {
        throw ApiException.InternalServerError('Empty embedding');
      }
      return embedding;
    }
    throw ApiException.InternalServerError('Empty embeddings service response');
  }
}

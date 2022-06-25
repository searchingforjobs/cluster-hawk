import { Injectable } from '@nestjs/common';
import { ApiException } from '../../shared/exceptions/api.exception';

@Injectable()
export class FaceRecognitionService {
  async recognize(buffer: Buffer) {
    throw ApiException.NotImplemented();
  }
}

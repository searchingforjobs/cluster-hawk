import { Injectable } from '@nestjs/common';
import * as EasyYandexS3 from 'easy-yandex-s3';

@Injectable()
export class S3Service {
  s3;

  constructor() {
    this.s3 = new EasyYandexS3({
      auth: {
        accessKeyId: process.env.OBJECT_STORAGE_KEY_IDENTIFIER,
        secretAccessKey: process.env.OBJECT_STORAGE_SECRET_KEY,
      },
      Bucket: process.env.OBJECT_STORAGE_BUCKET,
      debug: true,
    });
  }

  async upload(buffer): Promise<string | false> {
    const linkOrFalse = await this.s3.Upload(
      {
        buffer: buffer,
      },
      '/photo/',
    );
    return linkOrFalse;
  }
}

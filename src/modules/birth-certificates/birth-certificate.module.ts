import { Module } from '@nestjs/common';
import { BirthCertificateService } from './birth-certificate.service';
import { BirthCertificateController } from './birth-certificate.controller';
import { S3Service } from '../s3/s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BirthCertificate } from '../../entities/birth-certificate.entity';

@Module({
  controllers: [BirthCertificateController],
  providers: [BirthCertificateService, S3Service],
  imports: [TypeOrmModule.forFeature([BirthCertificate])],
})
export class BirthCertificateModule {}

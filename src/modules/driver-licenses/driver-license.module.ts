import { Module } from '@nestjs/common';
import { DriverLicenseService } from './driver-license.service';
import { DriverLicenseController } from './driver-license.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverLicense } from '../../entities/driver-license.entity';
import { S3Service } from '../s3/s3.service';

@Module({
  controllers: [DriverLicenseController],
  providers: [DriverLicenseService, S3Service],
  imports: [TypeOrmModule.forFeature([DriverLicense])],
})
export class DriverLicenseModule {}

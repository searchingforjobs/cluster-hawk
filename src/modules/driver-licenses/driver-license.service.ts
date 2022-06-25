import { Injectable } from '@nestjs/common';
import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { UpdateDriverLicenseDto } from './dto/update-driver-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { DriverLicense } from '../../entities/driver-license.entity';
import { ApiException } from '../../shared/exceptions/api.exception';

@Injectable()
export class DriverLicenseService {
  constructor(
    @InjectRepository(DriverLicense)
    private readonly driverLicensesRepository: Repository<DriverLicense>,
    private readonly s3Service: S3Service,
  ) {}
  async create(dto: CreateDriverLicenseDto, image: Buffer) {
    const imageUrl = (await this.s3Service.upload(image))['Location'];
    if (imageUrl) {
      const passport = await this.driverLicensesRepository.create({
        ...dto,
        scanLink: imageUrl,
      });
      return await this.driverLicensesRepository.save(passport);
    }
    throw ApiException.BadRequest();
  }

  async findAll() {
    const passports = await this.driverLicensesRepository.find();
    return passports;
  }

  async findOne(id: string) {
    const passports = await this.driverLicensesRepository.find({
      where: {
        id: id,
      },
    });
    return passports;
  }

  async update(id: string, updateDriverLicenseDto: UpdateDriverLicenseDto) {
    const passports = await this.driverLicensesRepository.update(
      id,
      updateDriverLicenseDto,
    );
    return passports;
  }

  async remove(id: string) {
    const passports = await this.driverLicensesRepository.delete(id);
    return passports;
  }
}

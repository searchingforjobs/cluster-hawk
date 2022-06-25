import { Injectable } from '@nestjs/common';
import { CreateBirthCertificateDto } from './dto/create-birth-certificate.dto';
import { UpdateBirthCertificateDto } from './dto/update-birth-certificate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { BirthCertificate } from '../../entities/birth-certificate.entity';
import { ApiException } from '../../shared/exceptions/api.exception';

@Injectable()
export class BirthCertificateService {
  constructor(
    @InjectRepository(BirthCertificate)
    private readonly birthCertificateRepository: Repository<BirthCertificate>,
    private readonly s3Service: S3Service,
  ) {}

  async create(dto: CreateBirthCertificateDto, image: Buffer) {
    const imageUrl = (await this.s3Service.upload(image))['Location'];
    if (imageUrl) {
      const birthCertificate = await this.birthCertificateRepository.create({
        ...dto,
        scanLink: imageUrl,
      });
      return await this.birthCertificateRepository.save(birthCertificate);
    }
    throw ApiException.BadRequest();
  }

  async findAll() {
    const birthCertificates = await this.birthCertificateRepository.find();
    return birthCertificates;
  }

  async findOne(id: string) {
    const birthCertificates = await this.birthCertificateRepository.find({
      where: {
        id: id,
      },
    });
    return birthCertificates;
  }

  async update(id: string, dto: UpdateBirthCertificateDto) {
    const updateResult = await this.birthCertificateRepository.update(id, dto);
    return updateResult;
  }

  async remove(id: string) {
    const deleteResult = await this.birthCertificateRepository.delete(id);
    return deleteResult;
  }
}

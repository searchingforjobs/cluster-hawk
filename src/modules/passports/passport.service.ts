import { Injectable } from '@nestjs/common';
import { CreatePassportDto } from './dto/create-passport.dto';
import { UpdatePassportDto } from './dto/update-passport.dto';
import { S3Service } from '../s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passport } from '../../entities/passport.entity';
import { ApiException } from '../../shared/exceptions/api.exception';

@Injectable()
export class PassportService {
  constructor(
    @InjectRepository(Passport)
    private readonly passportsRepository: Repository<Passport>,
    private readonly s3Service: S3Service,
  ) {}

  async create(dto: CreatePassportDto, image: Buffer) {
    const imageUrl = (await this.s3Service.upload(image))['Location'];
    if (imageUrl) {
      const passport = await this.passportsRepository.create({
        ...dto,
        scanLink: imageUrl,
      });
      return await this.passportsRepository.save(passport);
    }
    throw ApiException.BadRequest();
  }

  async findAll() {
    const passports = await this.passportsRepository.find();
    return passports;
  }

  async findOne(id: string) {
    const passports = await this.passportsRepository.findOne({
      where: {
        id: id,
      },
    });
    return passports;
  }

  async update(id: string, updateEventDto: UpdatePassportDto) {
    const passports = await this.passportsRepository.update(id, updateEventDto);
    return passports;
  }

  async remove(id: string) {
    const passports = await this.passportsRepository.delete(id);
    return passports;
  }
}

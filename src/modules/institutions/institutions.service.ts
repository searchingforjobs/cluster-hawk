import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Institution } from '../../entities/institution.entity';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionsRepository: Repository<Institution>,
  ) {}
  async create(createInstitutionDto: CreateInstitutionDto) {
    const institution = await this.institutionsRepository.create(
      createInstitutionDto,
    );
    return await this.institutionsRepository.save(institution);
  }

  async findAll() {
    const institutions = await this.institutionsRepository.find();
    return institutions;
  }

  async findOne(id: string) {
    const institutions = await this.institutionsRepository.find({
      where: {
        id: id,
      },
    });
    return institutions;
  }

  async update(id: string, updateInstitutionDto: UpdateInstitutionDto) {
    const institutions = await this.institutionsRepository.update(
      id,
      updateInstitutionDto,
    );
    return institutions;
  }

  async remove(id: string) {
    const institutions = await this.institutionsRepository.delete(id);
    return institutions;
  }
}

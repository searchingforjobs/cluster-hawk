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
    return `This action returns all institutions`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} institution`;
  }

  async update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    return `This action updates a #${id} institution`;
  }

  async remove(id: number) {
    return `This action removes a #${id} institution`;
  }
}

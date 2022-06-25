import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly eventsRepository: Repository<Profile>,
  ) {}
  async create(dto: CreateProfileDto) {
    const profile = await this.eventsRepository.create(dto);
    return await this.eventsRepository.save(profile);
  }

  async findAll() {
    const profiles = await this.eventsRepository.find();
    return profiles;
  }

  async findOne(id: string) {
    const profiles = await this.eventsRepository.findOne({
      where: {
        id: id,
      },
    });
    return profiles;
  }

  async update(id: string, dto: UpdateProfileDto) {
    const profiles = await this.eventsRepository.update(id, dto);
    return profiles;
  }

  async remove(id: string) {
    const profiles = await this.eventsRepository.delete(id);
    return profiles;
  }
}

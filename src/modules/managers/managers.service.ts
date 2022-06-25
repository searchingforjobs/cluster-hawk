import { Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { InstitutionsService } from '../institutions/institutions.service';
import { ManagerProfile } from '../../entities/manager-profile.entity';
import { UpdateSecurityDto } from '../security/dto/update-security.dto';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(ManagerProfile)
    private readonly managerProfileRepository: Repository<ManagerProfile>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly profilesService: ProfilesService,
    private readonly institutionsService: InstitutionsService,
  ) {}

  async create(dto: CreateManagerDto) {
    const profile = await this.profilesService.findOne(dto.profileId);

    const institution = await this.institutionsService.findOne(
      dto.institutionId,
    );

    const user = await this.usersRepository.findOne({
      where: {
        id: dto.userId,
      },
    });

    const securityProfile = await this.managerProfileRepository.create(dto);

    securityProfile.user = user;
    securityProfile.institution = institution;
    securityProfile.profile = profile;

    return await this.managerProfileRepository.save(securityProfile);
  }

  async findAll() {
    const managerProfiles = await this.managerProfileRepository.find({
      relations: {
        institution: true,
        profile: true,
        user: true,
      },
    });
    return managerProfiles;
  }

  async findOne(id: string) {
    const managerProfile = await this.managerProfileRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        institution: true,
        profile: true,
        user: true,
      },
    });
    return managerProfile;
  }

  async update(id: string, dto: UpdateSecurityDto) {
    const updateResult = await this.managerProfileRepository.update(id, dto);
    return updateResult;
  }

  async remove(id: string) {
    const deleteResult = await this.managerProfileRepository.delete(id);
    return deleteResult;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateSecurityDto } from './dto/create-security.dto';
import { UpdateSecurityDto } from './dto/update-security.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecurityProfile } from '../../entities/security-profile.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { InstitutionsService } from '../institutions/institutions.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(SecurityProfile)
    private readonly securityProfileRepository: Repository<SecurityProfile>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly profilesService: ProfilesService,
    private readonly institutionsService: InstitutionsService,
  ) {}

  async create(dto: CreateSecurityDto) {
    const profile = await this.profilesService.findOne(dto.profileId);

    const institution = await this.institutionsService.findOne(
      dto.institutionId,
    );

    const user = await this.usersRepository.findOne({
      where: {
        id: dto.userId,
      },
    });

    const securityProfile = await this.securityProfileRepository.create(dto);

    securityProfile.user = user;
    securityProfile.institution = institution;
    securityProfile.profile = profile;

    return await this.securityProfileRepository.save(securityProfile);
  }

  async findAll() {
    const securityProfiles = await this.securityProfileRepository.find({
      relations: {
        institution: true,
        profile: true,
        user: true,
      },
    });
    return securityProfiles;
  }

  async findOne(id: string) {
    const securityProfiles = await this.securityProfileRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        institution: true,
        profile: true,
        user: true,
      },
    });
    return securityProfiles;
  }

  async update(id: string, dto: UpdateSecurityDto) {
    const updateResult = await this.securityProfileRepository.update(id, dto);
    return updateResult;
  }

  async remove(id: string) {
    const deleteResult = await this.securityProfileRepository.delete(id);
    return deleteResult;
  }
}

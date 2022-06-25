import { Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from '../../entities/visit.entity';
import { Attendee } from '../../entities/attendee.entity';
import { SecurityProfile } from '../../entities/security-profile.entity';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitsRepository: Repository<Visit>,
    @InjectRepository(SecurityProfile)
    private readonly securityRepository: Repository<SecurityProfile>,
    @InjectRepository(Attendee)
    private readonly attendeesRepository: Repository<Attendee>,
  ) {}

  async create(createVisitDto: CreateVisitDto) {
    const securityProfile = await this.securityRepository.findOne({
      where: {
        id: createVisitDto.securityId,
      },
    });
    const attendee = await this.attendeesRepository.findOne({
      where: {
        id: createVisitDto.attendeeId,
      },
    });
    const visit = await this.visitsRepository.create();
    visit.security = securityProfile;
    visit.attendee = attendee;
    return await this.visitsRepository.save(visit);
  }

  async findAll() {
    const visits = await this.visitsRepository.find({
      relations: {
        attendee: true,
        security: true,
      },
    });
    return visits;
  }

  async findOne(id: string) {
    const passports = await this.visitsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        attendee: true,
        security: true,
      },
    });
    return passports;
  }
}

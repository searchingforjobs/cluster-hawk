import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { Incident } from '../../entities/incident.entity';
import { SecurityService } from '../security/security.service';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentsRepository: Repository<Incident>,
    private readonly securityService: SecurityService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createIncidentDto: CreateIncidentDto, image: Buffer) {
    const imageUrl = (await this.s3Service.upload(image))['Location'];
    const security = await this.securityService.findOne(
      createIncidentDto.securityId,
    );
    const incident = await this.incidentsRepository.create(createIncidentDto);
    incident.security = security;
    incident.photoUrl = imageUrl;
    return await this.incidentsRepository.save(incident);
  }

  async findAll() {
    const incidents = await this.incidentsRepository.find();
    return incidents;
  }

  async findOne(id: string) {
    const incident = await this.incidentsRepository.findOne({
      where: {
        id: id,
      },
    });
    return incident;
  }

  async update(id: string, updateIncidentDto: UpdateIncidentDto) {
    const updateResult = await this.incidentsRepository.update(
      id,
      updateIncidentDto,
    );
    return updateResult;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { S3Service } from '../s3/s3.service';
import { ApiException } from '../../shared/exceptions/api.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendee } from '../../entities/attendee.entity';
import { User } from '../users/entities/user.entity';
import { Profile } from '../../entities/profile.entity';
import { Passport } from '../../entities/passport.entity';
import { DriverLicense } from '../../entities/driver-license.entity';
import { EmbeddingsService } from '../embeddings/embeddings.service';

@Injectable()
export class AttendeesService {
  constructor(
    @InjectRepository(Attendee)
    private readonly attendeesRepository: Repository<Attendee>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Passport)
    private readonly passportsRepository: Repository<Passport>,
    @InjectRepository(DriverLicense)
    private readonly driverLicensesRepository: Repository<DriverLicense>,
    private readonly s3Service: S3Service,
    private readonly embeddingsService: EmbeddingsService,
  ) {}

  async create(dto: CreateAttendeeDto, image: Buffer) {
    const imageUrl = (await this.s3Service.upload(image))['Location'];
    if (imageUrl) {
      const embeddings = (
        await this.embeddingsService.getEmbeddingsByPhotoUrl(imageUrl)
      )['descriptor'];

      const embedding = [];

      for (const [, value] of Object.entries(embeddings)) {
        embedding.push(value);
      }

      const attendee = await this.attendeesRepository.create({
        contactPhone: dto.contactPhone,
        photoUrl: imageUrl,
        embedding: embedding,
      });

      if (dto.userId) {
        attendee.user = await this.usersRepository.findOne({
          where: {
            id: dto.userId,
          },
        });
      }

      if (dto.profileId) {
        attendee.profile = await this.profileRepository.findOne({
          where: {
            id: dto.profileId,
          },
        });
      }

      if (dto.driverLicenseId) {
        attendee.driverLicense = await this.driverLicensesRepository.findOne({
          where: {
            id: dto.driverLicenseId,
          },
        });
      }

      if (dto.passportId) {
        attendee.passport = await this.passportsRepository.findOne({
          where: {
            id: dto.passportId,
          },
        });
      }

      return await this.attendeesRepository.save(attendee);
    }
    throw ApiException.BadRequest();
  }

  async findAll() {
    const attendees = await this.attendeesRepository.find({
      relations: {
        user: true,
        profile: true,
        passport: true,
        driverLicense: true,
      },
    });
    return attendees;
  }

  async findOne(id: string) {
    const attendee = await this.attendeesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        profile: true,
        passport: true,
        driverLicense: true,
      },
    });
    return attendee;
  }

  async update(id: string, updateAttendeeDto: UpdateAttendeeDto) {
    const updateResult = await this.attendeesRepository.update(
      id,
      updateAttendeeDto,
    );
    return updateResult;
  }

  async remove(id: string) {
    const deleteResult = await this.attendeesRepository.delete(id);
    return deleteResult;
  }
}

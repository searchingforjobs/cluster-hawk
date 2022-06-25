import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from '../../entities/incident.entity';
import { SecurityService } from '../security/security.service';
import { S3Service } from '../s3/s3.service';
import { SecurityProfile } from '../../entities/security-profile.entity';
import { User } from '../users/entities/user.entity';
import { Profile } from '../../entities/profile.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { InstitutionsService } from '../institutions/institutions.service';
import { Institution } from '../../entities/institution.entity';

@Module({
  controllers: [IncidentsController],
  providers: [
    IncidentsService,
    SecurityService,
    S3Service,
    ProfilesService,
    InstitutionsService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Incident,
      SecurityProfile,
      User,
      Profile,
      Institution,
    ]),
  ],
})
export class IncidentsModule {}

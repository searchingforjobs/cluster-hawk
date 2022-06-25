import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityProfile } from '../../entities/security-profile.entity';
import { Institution } from '../../entities/institution.entity';
import { Profile } from '../../entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { InstitutionsService } from '../institutions/institutions.service';

@Module({
  controllers: [SecurityController],
  providers: [SecurityService, ProfilesService, InstitutionsService],
  imports: [
    TypeOrmModule.forFeature([SecurityProfile, User, Profile, Institution]),
  ],
})
export class SecurityModule {}

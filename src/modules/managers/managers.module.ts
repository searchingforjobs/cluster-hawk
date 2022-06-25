import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Profile } from '../../entities/profile.entity';
import { Institution } from '../../entities/institution.entity';
import { ManagerProfile } from '../../entities/manager-profile.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { InstitutionsService } from '../institutions/institutions.service';

@Module({
  controllers: [ManagersController],
  providers: [ManagersService, ProfilesService, InstitutionsService],
  imports: [
    TypeOrmModule.forFeature([ManagerProfile, User, Profile, Institution]),
  ],
})
export class ManagersModule {}

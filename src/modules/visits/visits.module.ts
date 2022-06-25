import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from '../../entities/visit.entity';
import { SecurityProfile } from '../../entities/security-profile.entity';
import { Attendee } from '../../entities/attendee.entity';

@Module({
  controllers: [VisitsController],
  providers: [VisitsService],
  imports: [TypeOrmModule.forFeature([Visit, SecurityProfile, Attendee])],
})
export class VisitsModule {}

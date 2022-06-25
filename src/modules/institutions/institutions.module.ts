import { Module } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { SessionRefreshToken } from '../auth/entities/session-refresh-tokens.entity';
import { Institution } from '../../entities/institution.entity';

@Module({
  controllers: [InstitutionsController],
  providers: [InstitutionsService],
  imports: [TypeOrmModule.forFeature([Institution])],
})
export class InstitutionsModule {}

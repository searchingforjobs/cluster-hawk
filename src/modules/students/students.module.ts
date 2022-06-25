import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from '../../entities/institution.entity';
import { Student } from '../../entities/student.entity';
import { BirthCertificate } from '../../entities/birth-certificate.entity';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [TypeOrmModule.forFeature([Student, Institution, BirthCertificate])],
})
export class StudentsModule {}

import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from '../../entities/institution.entity';
import { Repository } from 'typeorm';
import { BirthCertificate } from '../../entities/birth-certificate.entity';
import { Student } from '../../entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    @InjectRepository(BirthCertificate)
    private readonly birthCertificateRepository: Repository<BirthCertificate>,
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const institution = await this.institutionRepository.findOne({
      where: {
        id: createStudentDto.institutionId,
      },
    });

    const birthCertificate = await this.birthCertificateRepository.findOne({
      where: {
        id: createStudentDto.birthCertificateId,
      },
    });

    const student = await this.studentsRepository.create(createStudentDto);

    student.institution = institution;
    student.birthCertificate = birthCertificate;

    return await this.studentsRepository.save(student);
  }

  async findAll() {
    const students = await this.studentsRepository.find({
      relations: {
        institution: true,
        birthCertificate: true,
      },
    });
    return students;
  }

  async findOne(id: string) {
    const students = await this.studentsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        institution: true,
        birthCertificate: true,
      },
    });
    return students;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const updateResult = await this.studentsRepository.update(
      id,
      updateStudentDto,
    );
    return updateResult;
  }

  async remove(id: string) {
    const deleteResult = await this.studentsRepository.delete(id);
    return deleteResult;
  }
}

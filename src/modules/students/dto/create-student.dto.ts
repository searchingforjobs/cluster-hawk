import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../interfaces/genders.interface';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Institution id',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  institutionId: string;

  @ApiProperty({
    description: 'Birth certificate id',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  birthCertificateId: string;

  @ApiProperty({
    description: 'Admissed at date',
  })
  @IsDateString()
  @IsNotEmpty()
  admissedAt: Date;

  @ApiProperty({ example: '2007', description: 'Study start year' })
  @IsString()
  @IsNotEmpty()
  studyStartYear: string;

  @ApiProperty({ example: 'Владимир', description: 'Firstname' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Дмитриевич', description: 'Middlename' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  middlename: string;

  @ApiProperty({ example: 'Шустов', description: 'Lastname' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'Birthdate',
  })
  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty({
    example: 'Мужчина',
    description: 'Gender (Мужчина, Женщина, Не указано)',
  })
  @IsEnum(Gender)
  gender: Gender;
}

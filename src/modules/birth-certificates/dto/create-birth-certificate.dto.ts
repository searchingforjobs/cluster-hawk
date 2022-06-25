import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../interfaces/genders.interface';
import {
  IsBooleanString,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBirthCertificateDto {
  @ApiProperty({ example: '496', description: 'Birth record number' })
  @IsString()
  @IsNotEmpty()
  birthRecordNumber: string;

  @ApiProperty({
    example: 'Отдел ЗАГС Советского р-на г. Москвы',
    description: 'State registration place',
  })
  @IsString()
  @IsNotEmpty()
  stateRegistrationPlace: string;

  @ApiProperty({ example: 'Иван', description: `Father's firstname` })
  @IsString()
  @IsNotEmpty()
  fatherFirstname: string;

  @ApiProperty({ example: 'Иванов', description: `Father's lastname` })
  @IsString()
  @IsNotEmpty()
  fatherLastname: string;

  @ApiProperty({ example: 'Иванович', description: `Father's middlename` })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fatherMiddlename: string;

  @ApiProperty({ example: 'Русский', description: `Father's nationality` })
  @IsString()
  @IsNotEmpty()
  fatherNationality: string;

  @ApiProperty({ example: 'Анна', description: `Mother's firstname` })
  @IsString()
  @IsNotEmpty()
  motherFirstname: string;

  @ApiProperty({ example: 'Иванова', description: `Mother's lastname` })
  @IsString()
  @IsNotEmpty()
  motherLastname: string;

  @ApiProperty({ example: 'Ивановна', description: `Mother's middlename` })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  motherMiddlename: string;

  @ApiProperty({ example: 'Русская', description: `Mother's nationality` })
  @IsString()
  @IsNotEmpty()
  motherNationality: string;

  @ApiProperty({
    description: 'Issue date',
  })
  @IsDateString()
  issuedAt: Date;

  @ApiProperty({ example: 'I-CH №000000', description: `Document's id` })
  @IsString()
  @IsNotEmpty()
  documentId: string;

  @ApiProperty({ example: 'false', description: `Show that signature exist` })
  @IsBooleanString()
  @IsNotEmpty()
  signature: boolean;

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
  birthdate: Date;

  @ApiProperty({
    example: 'Мужчина',
    description: 'Gender (Мужчина, Женщина, Не указано)',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: 'г. Краснодар', description: 'Locality' })
  @IsString()
  @IsNotEmpty()
  placeOfBirth: string;
}

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

export class CreatePassportDto {
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

  @ApiProperty({ example: '4208', description: 'Document series' })
  @IsString()
  @IsNotEmpty()
  documentSeries: string;

  @ApiProperty({ example: '556123', description: 'Document number' })
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({ example: 'г. Краснодар', description: 'Locality' })
  @IsString()
  @IsNotEmpty()
  placeOfBirth: string;

  @ApiProperty({ example: 'false', description: `Show that signature exist` })
  @IsBooleanString()
  @IsNotEmpty()
  signature: boolean;

  @ApiProperty({ example: 'false', description: `Show that stamp exist` })
  @IsBooleanString()
  @IsNotEmpty()
  stamp: boolean;

  @ApiProperty({
    example: 'Отделением УФМС России по гор. Москве по району Хамовники',
    description: 'Issuer',
  })
  @IsString()
  @IsNotEmpty()
  issuedBy: string;

  @ApiProperty({
    description: 'Issue date',
  })
  @IsDateString()
  issuedAt: Date;

  @ApiProperty({ example: '770-011', description: 'Division code' })
  @IsString()
  @IsNotEmpty()
  divisionCode: string;
}

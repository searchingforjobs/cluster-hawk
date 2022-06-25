import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../interfaces/genders.interface';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 'Владимир', description: 'Firstname' })
  @IsString()
  firstname: string;

  @ApiProperty({ example: 'Дмитриевич', description: 'Middlename' })
  @IsString()
  @IsOptional()
  middlename?: string;

  @ApiProperty({ example: 'Шустов', description: 'Lastname' })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'Birthdate',
  })
  @IsDateString()
  @IsOptional()
  birthdate?: Date;

  @ApiProperty({
    example: 'Мужчина',
    description: 'Gender (Мужчина, Женщина, Не указано)',
  })
  @IsEnum(Gender)
  gender: Gender;
}

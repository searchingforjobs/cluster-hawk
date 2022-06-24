import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Locale } from '../interfaces';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email address',
    required: true,
  })
  @IsNotEmpty({ message: 'Not empty email required' })
  @IsEmail({ message: 'Should be email' })
  email: string;

  @ApiProperty({
    example: 'shuimi',
    description: 'Username (unique)',
    required: true,
  })
  @IsNotEmpty({ message: 'Not empty username required' })
  @IsString({ message: 'Should be a string' })
  @Length(3, 30)
  username: string;

  @Length(4, 70)
  @ApiProperty({ example: 'f@J4Sd3$lsc#!', description: 'Password' })
  password: string;

  @ApiProperty({
    example: 'ru_RU',
    description: 'User locale (ru_RU, en_EN)',
    required: true,
  })
  @IsOptional()
  @IsEnum(Locale)
  locale: Locale;
}

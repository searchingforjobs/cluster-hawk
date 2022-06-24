import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email address',
    required: true,
  })
  @IsNotEmpty({ message: 'Not empty email required' })
  @IsEmail({ message: 'Should be email' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'shuimi',
    description: 'Username (unique)',
    required: true,
  })
  @IsNotEmpty({ message: 'Not empty username required' })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  username?: string;

  @Length(4, 70)
  @ApiProperty({ example: 'f@J4Sd3$lsc#!', description: 'Password' })
  password: string;
}

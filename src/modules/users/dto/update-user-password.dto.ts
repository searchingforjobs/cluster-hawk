import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class UpdateUserPasswordDto {
  @Length(4, 70)
  @ApiProperty({ example: 'f@J4Sd3$lsc#!', description: 'Password' })
  password: string;
}

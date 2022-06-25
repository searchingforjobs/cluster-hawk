import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateIncidentDto {
  @ApiProperty({ description: 'Security profile uuid' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  securityId?: string;

  @ApiProperty({ example: 'Владимир', description: 'Firstname' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Дмитриевич', description: 'Middlename' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  middlename: string;

  @ApiProperty({ example: 'Шустов', description: 'Lastname' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ description: 'Incident description' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;
}

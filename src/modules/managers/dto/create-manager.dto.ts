import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateManagerDto {
  @ApiProperty({
    description: 'Profile id',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  profileId: string;

  @ApiProperty({
    description: 'User id',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @ApiProperty({
    description: 'Institution id',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  institutionId: string;

  @ApiProperty({
    example: 'Завуч по воспитательной работе',
    description: 'Position',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  position: string;

  @ApiProperty({
    description: 'Admission date',
  })
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  admissedAt: Date;
}

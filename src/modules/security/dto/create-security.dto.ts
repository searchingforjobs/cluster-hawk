import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateSecurityDto {
  @ApiProperty({
    description: 'Profile uuid',
  })
  @IsOptional()
  profileId?: string;

  @ApiProperty({
    description: 'User uuid',
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    description: 'Institution uuid',
  })
  @IsUUID()
  @IsOptional()
  institutionId?: string;

  @ApiProperty({
    description: 'Admission date',
  })
  @IsDateString()
  admissedAt: Date;
}

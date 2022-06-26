import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAttendeeDto {
  @ApiProperty({ description: `driverLicenseId` })
  @IsOptional()
  driverLicenseId?: string;

  @ApiProperty({ description: `profileId` })
  @IsOptional()
  profileId?: string;

  @ApiProperty({ description: `userId` })
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: `passportId` })
  @IsOptional()
  passportId?: string;

  @ApiProperty({ example: '88005553535', description: `Contact phone` })
  @IsString()
  @IsNotEmpty()
  contactPhone: string;
}

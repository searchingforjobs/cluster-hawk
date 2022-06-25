import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAttendeeDto {
  @ApiProperty({ description: `driverLicenseId` })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  driverLicenseId: string;

  @ApiProperty({ description: `profileId` })
  @IsString()
  @IsNotEmpty()
  profileId: string;

  @ApiProperty({ description: `userId` })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @ApiProperty({ description: `passportId` })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  passportId: string;

  @ApiProperty({ example: '88005553535', description: `Contact phone` })
  @IsString()
  @IsNotEmpty()
  contactPhone: string;
}

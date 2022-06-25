import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDriverLicenseDto {
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

  @ApiProperty({ example: 'ГИБДД 3901', description: 'Issued by' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  issuedBy: string;

  @ApiProperty({ example: 'г. Краснодар', description: 'City issued in' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cityIssuedIn: string;

  @ApiProperty({
    example: 'Краснодарский край',
    description: 'Region issued in',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  regionIssuedIn: string;

  @ApiProperty({ example: 'false', description: `Show that signature exist` })
  @IsBooleanString()
  @IsNotEmpty()
  signature: boolean;

  @ApiProperty({ example: `['A', 'B']`, description: `Array of categories` })
  categories: string[];
}

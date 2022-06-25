import { ApiProperty } from '@nestjs/swagger';
import { InstitutionType } from '../../../interfaces/institution-type.interface';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInstitutionDto {
  @ApiProperty({
    example: 'Школа',
    description: 'Institution type (KINDERGARTEN, SCHOOL)',
  })
  @IsEnum(InstitutionType)
  type: InstitutionType;

  @ApiProperty({ example: 'МБОУ СОШ №18', description: 'Name of institution' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Краснодарский край', description: 'Region name' })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({ example: '350042', description: 'Postal code' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  postalCode?: string;

  @ApiProperty({ example: 'ул. Пушкина', description: 'Street' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: 'Краснодар', description: 'Locality' })
  @IsString()
  @IsNotEmpty()
  locality: string;

  @ApiProperty({ example: 'д. 1', description: 'Building' })
  @IsString()
  @IsNotEmpty()
  building: string;

  @ApiProperty({ example: '88005553535', description: 'Contact phone' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  contactPhone?: string;

  @ApiProperty({ example: 'example@email.com', description: 'Contact email' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  contactEmail?: string;
}

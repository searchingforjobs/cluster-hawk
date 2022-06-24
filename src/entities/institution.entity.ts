import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { InstitutionType } from '../interfaces/institution-type.interface';

@Entity()
export class Institution {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty({
    example: 'Школа',
    description: 'Institution type (KINDERGARTEN, SCHOOL)',
  })
  @Column({
    type: 'enum',
    enum: InstitutionType,
    default: InstitutionType.SCHOOL,
    nullable: true,
  })
  @Index()
  type: InstitutionType;

  @ApiProperty({ example: 'МБОУ СОШ №18', description: 'Name of institution' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  @Index()
  name: string;

  @ApiProperty({ example: 'Краснодарский край', description: 'Region name' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  region: string;

  @ApiProperty({ example: '350042', description: 'Postal code' })
  @Column({ type: 'varchar', unique: false, nullable: true })
  postalCode: string;

  @ApiProperty({ example: 'ул. Пушкина', description: 'Street' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  street: string;

  @ApiProperty({ example: 'Краснодар', description: 'Locality' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  locality: string;

  @ApiProperty({ example: 'д. 1', description: 'Building' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  building: string;

  @ApiProperty({ example: '88005553535', description: 'Contact phone' })
  @Column({ type: 'varchar', unique: false, nullable: true })
  contactPhone: string;

  @ApiProperty({ example: 'example@email.com', description: 'Contact email' })
  @Column({ type: 'varchar', unique: false, nullable: true })
  contactEmail: string;
}

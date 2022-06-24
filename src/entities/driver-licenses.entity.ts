import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class DriverLicenses {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty({ example: 'Владимир', description: 'Firstname' })
  @Column({ type: 'varchar', length: 70, unique: false, nullable: false })
  @Index()
  firstname: string;

  @ApiProperty({ example: 'Дмитриевич', description: 'Middlename' })
  @Column({ type: 'varchar', length: 70, unique: false, nullable: true })
  @Index()
  middlename: string;

  @ApiProperty({ example: 'Шустов', description: 'Lastname' })
  @Column({ type: 'varchar', length: 70, unique: false, nullable: false })
  @Index()
  lastname: string;

  @ApiProperty({
    description: 'Birthdate',
  })
  @Column({ type: 'timestamptz', nullable: true })
  birthdate: Date;

  @ApiProperty({ example: 'ГИБДД 3901', description: 'Issued by' })
  @Column({ type: 'varchar', unique: false, nullable: true })
  issuedBy: string;

  @ApiProperty({ example: 'г. Краснодар', description: 'City issued in' })
  @Column({ type: 'varchar', unique: false, nullable: true })
  cityIssuedIn: string;

  @ApiProperty({
    example: 'Краснодарский край',
    description: 'Region issued in',
  })
  @Column({ type: 'varchar', unique: false, nullable: true })
  regionIssuedIn: string;

  @ApiProperty({ example: 'false', description: `Show that signature exist` })
  @Column({ type: 'bool', default: false })
  signature: boolean;

  @ApiProperty({ example: `['A', 'B']`, description: `Array of categories` })
  @Column({
    type: 'jsonb',
  })
  categories: string[];

  @ApiProperty({ description: 'Document scan link' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  scanLink: string;
}

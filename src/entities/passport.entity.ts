import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../interfaces/genders.interface';

@Entity()
export class Passport {
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

  @ApiProperty({
    example: 'Мужчина',
    description: 'Gender (Мужчина, Женщина, Не указано)',
  })
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.NOT_SPECIFIED,
    nullable: false,
  })
  @Index()
  gender: Gender;

  @ApiProperty({ example: '4208', description: 'Document series' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  documentSeries: string;

  @ApiProperty({ example: '556123', description: 'Document number' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  documentNumber: string;

  @ApiProperty({ example: 'г. Краснодар', description: 'Locality' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  placeOfBirth: string;

  @ApiProperty({ example: 'false', description: `Show that signature exist` })
  @Column({ type: 'bool', default: false })
  signature: boolean;

  @ApiProperty({ example: 'false', description: `Show that stamp exist` })
  @Column({ type: 'bool', default: false })
  stamp: boolean;

  @ApiProperty({
    example: 'Отделением УФМС России по гор. Москве по району Хамовники',
    description: 'Issuer',
  })
  @Column({ type: 'varchar', unique: false, nullable: false })
  issuedBy: string;

  @ApiProperty({
    description: 'Issue date',
  })
  @Column({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
  issuedAt: Date;

  @ApiProperty({ example: '770-011', description: 'Division code' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  divisionCode: string;

  @ApiProperty({ description: 'Document scan link' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  scanLink: string;
}

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../interfaces/genders.interface';

@Entity()
export class BirthCertificate {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty({ example: '496', description: 'Birth record number' })
  @Column({ type: 'varchar', nullable: false })
  birthRecordNumber: string;

  @ApiProperty({
    example: 'Отдел ЗАГС Советского р-на г. Москвы',
    description: 'State registration place',
  })
  @Column({ type: 'varchar', nullable: false })
  stateRegistrationPlace: string;

  @ApiProperty({ example: 'Иван', description: `Father's firstname` })
  @Column({ type: 'varchar', nullable: false })
  fatherFirstname: string;

  @ApiProperty({ example: 'Иванов', description: `Father's lastname` })
  @Column({ type: 'varchar', nullable: false })
  fatherLastname: string;

  @ApiProperty({ example: 'Иванович', description: `Father's middlename` })
  @Column({ type: 'varchar', nullable: false })
  fatherMiddlename: string;

  @ApiProperty({ example: 'Русский', description: `Father's nationality` })
  @Column({ type: 'varchar', nullable: false })
  fatherNationality: string;

  @ApiProperty({ example: 'Анна', description: `Mother's firstname` })
  @Column({ type: 'varchar', nullable: false })
  motherFirstname: string;

  @ApiProperty({ example: 'Иванова', description: `Mother's lastname` })
  @Column({ type: 'varchar', nullable: false })
  motherLastname: string;

  @ApiProperty({ example: 'Ивановна', description: `Mother's middlename` })
  @Column({ type: 'varchar', nullable: false })
  motherMiddlename: string;

  @ApiProperty({ example: 'Русская', description: `Mother's nationality` })
  @Column({ type: 'varchar', nullable: false })
  motherNationality: string;

  @ApiProperty({
    description: 'Issue date',
  })
  @Column({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
  issuedAt: Date;

  @ApiProperty({ example: 'I-CH №000000', description: `Document's id` })
  @Column({ type: 'varchar', nullable: false })
  documentId: string;

  @ApiProperty({ example: 'false', description: `Show that signature exist` })
  @Column({ type: 'bool', default: false })
  signature: boolean;

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
  @Column({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
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

  @ApiProperty({ example: 'г. Краснодар', description: 'Locality' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  placeOfBirth: string;

  @ApiProperty({ description: 'Document scan link' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  scanLink: string;
}

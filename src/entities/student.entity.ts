import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Institution } from './institution.entity';
import { BirthCertificate } from './birth-certificate.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../interfaces/genders.interface';
import { Attendee } from './attendee.entity';

@Entity()
export class Student {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ManyToOne(() => Institution, {
    cascade: true,
  })
  @JoinColumn({ name: 'institutionId' })
  institution: Institution;

  @Column({ nullable: true })
  institutionId: string;

  @OneToOne(() => BirthCertificate, {
    cascade: true,
  })
  @JoinColumn({ name: 'birthCertificateId' })
  birthCertificate: BirthCertificate;

  @Column({ nullable: true })
  birthCertificateId: string;

  @ApiProperty({
    description: 'Admissed at date',
  })
  @Column({ type: 'timestamptz', nullable: true, default: () => 'NOW()' })
  admissedAt: Date;

  @ApiProperty({ example: '2007', description: 'Study start year' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  studyStartYear: string;

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

  @ApiProperty({
    description: 'Creation timestamp',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Update timestamp',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Attendee, (attendee) => attendee.students)
  attendee: Attendee;
}

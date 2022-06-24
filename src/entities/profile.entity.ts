import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../interfaces/genders.interface';

@Entity()
export class Profile {
  @ApiProperty({
    example: '42',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('increment')
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
}

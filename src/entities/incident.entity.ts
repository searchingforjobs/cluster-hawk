import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SecurityProfile } from './security-profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Incident {
  @ApiProperty({
    example: '42',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('increment')
  @Index()
  id: string;

  @OneToOne(() => SecurityProfile, { cascade: true })
  @JoinColumn({ name: 'securityId' })
  security: SecurityProfile;

  @Column({ nullable: true })
  securityId: string;

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

  @ApiProperty({ description: `Photo url` })
  @Column({ type: 'varchar', unique: false, nullable: true })
  photoUrl: string;

  @ApiProperty({ description: 'Incident description' })
  @Column({ type: 'varchar', unique: false, nullable: true })
  description: string;

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

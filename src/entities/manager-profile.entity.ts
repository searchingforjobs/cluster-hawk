import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { User } from '../modules/users/entities/user.entity';
import { Institution } from './institution.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ManagerProfile {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @OneToOne(() => Profile, {
    cascade: true,
  })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @Column({ nullable: true })
  profileId: string;

  @OneToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @OneToOne(() => Institution, {
    cascade: true,
  })
  @JoinColumn({ name: 'institutionId' })
  institution: Institution;

  @Column({ nullable: true })
  institutionId: string;

  @ApiProperty({
    example: 'Завуч по воспитательной работе',
    description: 'Position',
  })
  @Column({ type: 'varchar', unique: false, nullable: true })
  position: string;

  @ApiProperty({
    description: 'Admission date',
  })
  @Column({ type: 'timestamptz', nullable: true })
  admissedAt: Date;
}

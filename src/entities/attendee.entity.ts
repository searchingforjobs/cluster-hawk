import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DriverLicense } from './driver-license.entity';
import { Profile } from './profile.entity';
import { User } from '../modules/users/entities/user.entity';
import { Passport } from './passport.entity';
import { AttendeeStatus } from '../interfaces/attendee-status.interface';
import { Student } from './student.entity';

@Entity()
export class Attendee {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @OneToOne(() => DriverLicense)
  driverLicense: DriverLicense;

  @OneToOne(() => Profile)
  profile: Profile;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => Passport)
  passport: Passport;

  @ApiProperty({ description: `Photo url` })
  @Column({ type: 'varchar', nullable: false })
  photoUrl: string;

  @ApiProperty({ example: `['A', 'B']`, description: `Array of categories` })
  @Column({
    type: 'json',
  })
  embedding: number[];

  @ApiProperty({
    example: 'PENDING',
    description: 'AttendeeStatus (PENDING, CONFIRMED)',
  })
  @Column({
    type: 'enum',
    enum: AttendeeStatus,
    default: AttendeeStatus.PENDING,
    nullable: false,
  })
  @Index()
  status: AttendeeStatus;

  @OneToMany(() => Student, (student) => student.attendee)
  students: Student[];
}

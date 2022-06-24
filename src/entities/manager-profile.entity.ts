import { Column, Entity, OneToOne } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from '../modules/users/entities/user.entity';
import { Institution } from './institution.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ManagerProfile {
  @OneToOne(() => Profile)
  profile: Profile;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => Institution)
  institution: Institution;

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

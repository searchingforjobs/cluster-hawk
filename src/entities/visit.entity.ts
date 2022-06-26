import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SecurityProfile } from './security-profile.entity';
import { Attendee } from './attendee.entity';

@Entity()
export class Visit {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ManyToOne(() => SecurityProfile, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'securityId' })
  security: SecurityProfile;

  @Column({ nullable: true, default: null })
  securityId: string;

  @ManyToOne(() => Attendee, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'attendeeId' })
  attendee: Attendee;

  @Column({ nullable: true, default: null })
  attendeeId: string;

  @ApiProperty({
    description: 'Creation timestamp',
  })
  @CreateDateColumn()
  createdAt: Date;
}

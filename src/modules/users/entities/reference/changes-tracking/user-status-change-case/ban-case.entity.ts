import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { StatusChangeCase } from './status-change-case.entity';

@Entity()
export class BanCase implements Pick<User, 'banReason'> {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'Service policy violation',
    description: 'Ban reason',
  })
  @Column({ type: 'varchar', length: 150, nullable: true })
  banReason: string;

  @OneToOne(() => StatusChangeCase)
  @JoinColumn()
  statusChangeCase: StatusChangeCase;
}

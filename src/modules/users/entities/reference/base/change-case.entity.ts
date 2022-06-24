import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user.entity';

export class ChangeCase {
  @ApiProperty({
    example: '42',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('increment')
  @Index()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ApiProperty({
    description: 'Creation timestamp',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
  })
  @JoinColumn()
  executor: User | null;
}

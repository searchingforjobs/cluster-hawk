import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Event {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty({ example: 'Родительское собрание', description: `Event name` })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({
    example: 'Тема родительского собрания',
    description: `Event description`,
  })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ApiProperty({
    description: 'Event date',
  })
  @Column({ type: 'timestamptz', nullable: true, default: () => 'NOW()' })
  date: Date;

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

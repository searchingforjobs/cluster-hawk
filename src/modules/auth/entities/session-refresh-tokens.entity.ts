import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SessionRefreshToken {
  @PrimaryColumn({ type: 'varchar' })
  @Index()
  ip: string;

  @ManyToOne(() => User, (user) => user.sessionRefreshTokens)
  user: User;

  @ApiProperty({
    description: 'Current valid refresh token',
  })
  @Column({ type: 'varchar', nullable: true })
  refreshTokenHash: string;

  @ApiProperty({
    description: 'Last refresh token update timestamp',
  })
  @Column({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
  refreshTokenUpdatedAt: Date;

  @ApiProperty({
    example: 'Service policy violation',
    description: 'Ban reason',
  })
  @Column({ type: 'varchar', length: 150, nullable: true })
  browserName: string;

  @ApiProperty({
    example: 'Service policy violation',
    description: 'Ban reason',
  })
  @Column({ type: 'varchar', length: 150, nullable: true })
  deviceModel: string;

  @ApiProperty({
    example: 'Service policy violation',
    description: 'Ban reason',
  })
  @Column({ type: 'varchar', length: 150, nullable: true })
  osName: string;

  @ApiProperty({
    example: 'Service policy violation',
    description: 'Ban reason',
  })
  @Column({ type: 'varchar', length: 150, nullable: true })
  osVersion: string;

  @ApiProperty({
    example: 'Service policy violation',
    description: 'Ban reason',
  })
  @Column({ type: 'varchar', length: 150, nullable: true })
  engineName: string;
}

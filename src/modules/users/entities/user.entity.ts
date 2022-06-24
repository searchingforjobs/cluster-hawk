import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IUserIdentity, Locale, UserStatus } from '../interfaces';
import {
  EmailChangeCase,
  PasswordChangeCase,
  UsernameChangeCase,
  StatusChangeCase,
} from './reference';
import { SessionRefreshToken } from '../../auth/entities/session-refresh-tokens.entity';

@Entity()
@Check(`char_length("password") > 3`)
@Check(`"email" ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'`)
export class User implements IUserIdentity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty({ example: 'user@mail.com', description: 'Email address' })
  @Column({ type: 'varchar', length: 70, unique: true, nullable: false })
  @Index()
  email: string;

  @ApiProperty({
    description: 'Last email update timestamp',
  })
  @Column({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
  emailUpdatedAt: Date;

  @ApiProperty({ example: 'shuimi', description: 'Username (unique)' })
  @Column({ type: 'varchar', length: 70, unique: true, nullable: false })
  @Index()
  username: string;

  @ApiProperty({
    description: 'Last username update timestamp',
  })
  @Column({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
  usernameUpdatedAt: Date;

  @ApiProperty({ example: 'f@J4Sd3$lsc#!', description: 'Password' })
  @Column({ type: 'varchar', length: 70, nullable: false })
  password: string;

  @ApiProperty({ example: '2', description: 'Failed auth attempts number' })
  @Column({ type: 'integer', nullable: false, default: 0 })
  failedAttempts: number;

  @ApiProperty({
    description: 'Last auth attempt timestamp',
  })
  @Column({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
  lastAuthAttemptAt: Date;

  @ApiProperty({
    description: 'Last password update timestamp',
  })
  @Column({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
  passwordUpdatedAt: Date;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'User status (INACTIVE, ACTIVE, BANNED, DELETED)',
  })
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.INACTIVE,
    nullable: false,
  })
  @Index()
  status: UserStatus;

  @ApiProperty({
    description: 'Last status update timestamp',
  })
  @Column({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
  statusUpdatedAt: Date;

  @ApiProperty({
    example: 'Service policy violation',
    description: 'Ban reason',
  })
  @Column({ type: 'varchar', length: 150, nullable: true })
  banReason: string;

  @ApiProperty({
    description: 'Creation timestamp',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: 'ru_RU',
    description: 'User locale (ru_RU, en_EN)',
  })
  @Column({
    type: 'enum',
    enum: Locale,
    default: Locale.ru_RU,
    nullable: false,
  })
  locale: Locale;

  @ApiProperty({
    description: 'User activation link',
  })
  @Column({ type: 'varchar', length: 150, nullable: true })
  activationLink: string;

  @OneToMany(() => EmailChangeCase, (changeCase) => changeCase.user)
  emailChangeCases: EmailChangeCase[];

  @OneToMany(() => PasswordChangeCase, (changeCase) => changeCase.user)
  passwordChangeCases: PasswordChangeCase[];

  @OneToMany(() => UsernameChangeCase, (changeCase) => changeCase.user)
  usernameChangeCases: UsernameChangeCase[];

  @OneToMany(() => StatusChangeCase, (changeCase) => changeCase.user)
  statusChangeCases: StatusChangeCase[];

  @OneToMany(() => SessionRefreshToken, (session) => session.user, {
    cascade: true,
  })
  sessionRefreshTokens: SessionRefreshToken[];
}

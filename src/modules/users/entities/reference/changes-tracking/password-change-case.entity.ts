import { Column, Entity } from 'typeorm';
import { ChangeCase } from '../base/change-case.entity';
import { User } from '../../user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PasswordChangeCase
  extends ChangeCase
  implements Pick<User, 'password'>
{
  @ApiProperty({ example: 'f@J4Sd3$lsc#!', description: 'Password' })
  @Column({ type: 'varchar', length: 70, nullable: false })
  password: string;
}

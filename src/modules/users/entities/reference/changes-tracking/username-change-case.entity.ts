import { Column, Entity } from 'typeorm';
import { ChangeCase } from '../base/change-case.entity';
import { User } from '../../user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UsernameChangeCase
  extends ChangeCase
  implements Pick<User, 'username'>
{
  @ApiProperty({ example: 'shuimi', description: 'Username (unique)' })
  @Column({ type: 'varchar', length: 70, unique: true, nullable: false })
  username: string;
}

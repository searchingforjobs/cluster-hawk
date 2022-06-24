import { Column, Entity } from 'typeorm';
import { ChangeCase } from '../../base/change-case.entity';
import { User } from '../../../user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../../../../interfaces';

@Entity()
export class StatusChangeCase
  extends ChangeCase
  implements Pick<User, 'status'>
{
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
  status: UserStatus;
}

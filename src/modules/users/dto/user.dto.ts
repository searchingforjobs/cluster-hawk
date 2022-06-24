import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { Locale } from '../interfaces';

export class UserDto {
  constructor(user: User) {
    this.email = user.email;
    this.username = user.username;
    this.banReason = user.banReason;
    this.createdAt = user.createdAt;
    this.locale = user.locale;
  }

  @ApiProperty({ example: 'user@mail.com', description: 'Email address' })
  email: string;

  @ApiProperty({ example: 'shuimi', description: 'Username (unique)' })
  username: string;

  @ApiProperty({
    example: 'Service policy violation',
    description: 'Ban reason',
  })
  banReason: string;

  @ApiProperty({
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'ru_RU',
    description: 'User locale (ru_RU, en_EN)',
  })
  locale: Locale;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserUsernameDto {
  @ApiProperty({
    example: 'shuimi',
    description: 'Username (unique)',
    required: true,
  })
  @IsNotEmpty({ message: 'Not empty username required' })
  @IsString({ message: 'Should be a string' })
  username: string;
}

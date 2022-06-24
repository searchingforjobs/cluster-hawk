import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserEmailDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email address',
    required: true,
  })
  @IsNotEmpty({ message: 'Not empty email required' })
  @IsEmail({ message: 'Should be email' })
  email: string;
}

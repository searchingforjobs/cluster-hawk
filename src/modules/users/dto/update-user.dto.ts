import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Locale } from '../interfaces';

export class UpdateUserDto {
  @ApiProperty({
    example: 'shuimi',
    description: 'Username (unique)',
    required: true,
  })
  @IsOptional()
  @IsString({ message: 'Should be a string' })
  username?: string;

  @ApiProperty({
    example: 'ru_RU',
    description: 'User locale (ru_RU, en_EN)',
    required: true,
  })
  @IsOptional()
  @IsEnum(Locale)
  locale?: Locale;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Родительское собрание', description: `Event name` })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Тема родительского собрания',
    description: `Event description`,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Event date',
  })
  @IsDateString()
  date: Date;
}

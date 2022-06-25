import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateVisitDto {
  @ApiProperty({
    description: 'Security id',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  securityId: string;

  @ApiProperty({
    description: 'Attendee id',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  attendeeId: string;
}

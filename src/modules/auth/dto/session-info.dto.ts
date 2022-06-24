import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IResult } from 'ua-parser-js';

export class SessionInfoDto {
  constructor(ip: string, data: IResult) {
    this.ip = ip;
    this.browserName = data.browser.name;
    this.deviceModel = data.device.model;
    this.osName = data.os.name;
    this.osVersion = data.os.version;
    this.engineName = data.engine.name;
  }

  @ApiProperty({
    example: '192.168.0.1',
    description: 'Ip address',
  })
  @IsNotEmpty({ message: 'Not empty email required' })
  ip: string;

  @ApiProperty({
    description: 'Browser name',
    nullable: true,
  })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  browserName: string;

  @ApiProperty({
    description: 'Device model',
    nullable: true,
  })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  deviceModel: string;

  @ApiProperty({
    description: 'OS Name',
    nullable: true,
  })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  osName: string;

  @ApiProperty({
    description: 'OS Version',
    nullable: true,
  })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  osVersion: string;

  @ApiProperty({
    description: 'Browser engine name',
    nullable: true,
  })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  engineName: string;
}

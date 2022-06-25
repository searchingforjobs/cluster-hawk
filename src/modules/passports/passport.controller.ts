import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PassportService } from './passport.service';
import { CreatePassportDto } from './dto/create-passport.dto';
import { UpdatePassportDto } from './dto/update-passport.dto';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm';
import { Passport } from '../../entities/passport.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@ApiTags('Passports')
@Controller('passport')
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create new one' })
  @ApiResponse({
    status: 200,
    type: Passport,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiImplicitFile({ name: 'file', required: true })
  create(@Body() dto: CreatePassportDto, @UploadedFile() image) {
    const buffer = image.buffer;
    return this.passportService.create(dto, buffer);
  }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  @ApiResponse({
    status: 200,
    type: [Passport],
  })
  findAll() {
    return this.passportService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({
    status: 200,
    type: Passport,
  })
  findOne(@Param('id') id: string) {
    return this.passportService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update one' })
  @ApiResponse({
    status: 200,
    type: UpdateResult,
  })
  update(@Param('id') id: string, @Body() dto: UpdatePassportDto) {
    return this.passportService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one' })
  @ApiResponse({
    status: 200,
    type: DeleteResult,
  })
  remove(@Param('id') id: string) {
    return this.passportService.remove(id);
  }
}

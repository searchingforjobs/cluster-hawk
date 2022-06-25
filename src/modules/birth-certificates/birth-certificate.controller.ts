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
import { BirthCertificateService } from './birth-certificate.service';
import { CreateBirthCertificateDto } from './dto/create-birth-certificate.dto';
import { UpdateBirthCertificateDto } from './dto/update-birth-certificate.dto';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { BirthCertificate } from '../../entities/birth-certificate.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm';

@ApiTags('Birth Certificates')
@Controller('birth-certificates')
export class BirthCertificateController {
  constructor(
    private readonly birthCertificateService: BirthCertificateService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create new one' })
  @ApiResponse({
    status: 200,
    type: BirthCertificate,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiImplicitFile({ name: 'file', required: true })
  create(
    @Body() createBirthCertificateDto: CreateBirthCertificateDto,
    @UploadedFile() image,
  ) {
    return this.birthCertificateService.create(
      createBirthCertificateDto,
      image,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  @ApiResponse({
    status: 200,
    type: [BirthCertificate],
  })
  findAll() {
    return this.birthCertificateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({
    status: 200,
    type: [BirthCertificate],
  })
  findOne(@Param('id') id: string) {
    return this.birthCertificateService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update one' })
  @ApiResponse({
    status: 200,
    type: UpdateResult,
  })
  update(
    @Param('id') id: string,
    @Body() updateBirthCertificateDto: UpdateBirthCertificateDto,
  ) {
    return this.birthCertificateService.update(id, updateBirthCertificateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one' })
  @ApiResponse({
    status: 200,
    type: DeleteResult,
  })
  remove(@Param('id') id: string) {
    return this.birthCertificateService.remove(id);
  }
}

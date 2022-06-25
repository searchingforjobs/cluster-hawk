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
import { DriverLicenseService } from './driver-license.service';
import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { UpdateDriverLicenseDto } from './dto/update-driver-license.dto';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { DriverLicense } from '../../entities/driver-license.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm';

@ApiTags('Driver Licenses')
@Controller('driver-licenses')
export class DriverLicenseController {
  constructor(private readonly driverLicenseService: DriverLicenseService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create new one' })
  @ApiResponse({
    status: 200,
    type: DriverLicense,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiImplicitFile({ name: 'file', required: true })
  create(
    @Body() createDriverLicenseDto: CreateDriverLicenseDto,
    @UploadedFile() image,
  ) {
    const buffer = image.buffer;
    return this.driverLicenseService.create(createDriverLicenseDto, buffer);
  }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  @ApiResponse({
    status: 200,
    type: [DriverLicense],
  })
  findAll() {
    return this.driverLicenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({
    status: 200,
    type: [DriverLicense],
  })
  findOne(@Param('id') id: string) {
    return this.driverLicenseService.findOne(id);
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
    @Body() updateDriverLicenseDto: UpdateDriverLicenseDto,
  ) {
    return this.driverLicenseService.update(id, updateDriverLicenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one' })
  @ApiResponse({
    status: 200,
    type: DeleteResult,
  })
  remove(@Param('id') id: string) {
    return this.driverLicenseService.remove(id);
  }
}

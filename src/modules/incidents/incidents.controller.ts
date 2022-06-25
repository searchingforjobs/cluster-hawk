import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { Incident } from '../../entities/incident.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@ApiTags('Incidents')
@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create new one' })
  @ApiResponse({
    status: 200,
    type: Incident,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiImplicitFile({ name: 'file', required: true })
  create(@Body() createIncidentDto: CreateIncidentDto, @UploadedFile() image) {
    const buffer = image.buffer;
    return this.incidentsService.create(createIncidentDto, buffer);
  }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  @ApiResponse({
    status: 200,
    type: [Incident],
  })
  findAll() {
    return this.incidentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({
    status: 200,
    type: Incident,
  })
  findOne(@Param('id') id: string) {
    return this.incidentsService.findOne(id);
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
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return this.incidentsService.update(id, updateIncidentDto);
  }
}

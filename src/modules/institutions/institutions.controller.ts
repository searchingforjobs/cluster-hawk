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
} from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Institution } from '../../entities/institution.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm';

@ApiTags('Institutions')
@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create new institution' })
  @ApiResponse({
    status: 200,
    description: 'New institution created',
    type: Institution,
  })
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionsService.create(createInstitutionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  @ApiResponse({
    status: 200,
    type: [Institution],
  })
  findAll() {
    return this.institutionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({
    status: 200,
    type: [Institution],
  })
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(id);
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
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionsService.update(id, updateInstitutionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one' })
  @ApiResponse({
    status: 200,
    type: DeleteResult,
  })
  remove(@Param('id') id: string) {
    return this.institutionsService.remove(id);
  }
}

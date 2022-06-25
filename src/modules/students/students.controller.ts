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
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Student } from '../../entities/student.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create new one' })
  @ApiResponse({
    status: 200,
    type: Student,
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  @ApiResponse({
    status: 200,
    type: [Student],
  })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({
    status: 200,
    type: [Student],
  })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update one' })
  @ApiResponse({
    status: 200,
    type: UpdateResult,
  })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one' })
  @ApiResponse({
    status: 200,
    type: DeleteResult,
  })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}

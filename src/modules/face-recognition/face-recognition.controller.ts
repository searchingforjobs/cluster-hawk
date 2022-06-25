import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FaceRecognitionService } from './face-recognition.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Attendee } from '../../entities/attendee.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@ApiTags('Face Recognition')
@Controller('face-recognition')
export class FaceRecognitionController {
  constructor(
    private readonly faceRecognitionService: FaceRecognitionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Get nearest attendees by photo' })
  @ApiResponse({
    status: 200,
    type: [Attendee],
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiImplicitFile({ name: 'file', required: true })
  async recognize(@UploadedFile() image) {
    const buffer = image.buffer;
    return this.faceRecognitionService.recognize(buffer);
  }
}

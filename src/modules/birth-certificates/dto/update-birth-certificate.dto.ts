import { PartialType } from '@nestjs/swagger';
import { CreateBirthCertificateDto } from './create-birth-certificate.dto';

export class UpdateBirthCertificateDto extends PartialType(
  CreateBirthCertificateDto,
) {}

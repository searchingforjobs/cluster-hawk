import { PartialType } from '@nestjs/swagger';
import { CreateDriverLicenseDto } from './create-driver-license.dto';

export class UpdateDriverLicenseDto extends PartialType(
  CreateDriverLicenseDto,
) {}

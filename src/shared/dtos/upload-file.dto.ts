import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadFileDto {
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: any;

  @IsOptional()
  folder?: string;
}

import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LogType } from '../schemas/log.schema';

export class LogDto {
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  type: LogType;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  user?: string;
}

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
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
}

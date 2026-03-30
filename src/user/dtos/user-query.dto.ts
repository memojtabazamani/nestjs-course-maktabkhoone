import { IsOptional, IsString } from 'class-validator';
import { GeneralQueryDto } from '../../shared/dtos/general-query.dto';

export class UserQueryDto extends GeneralQueryDto {
  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  mobile?: string;
}

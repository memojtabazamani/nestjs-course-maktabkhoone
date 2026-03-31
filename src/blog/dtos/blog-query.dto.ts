import { GeneralQueryDto } from '../../shared/dtos/general-query.dto';
import { IsOptional, IsString } from 'class-validator';

export enum Sort {
  Title = 'title',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export class BlogQueryDto extends GeneralQueryDto {
  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsString()
  category?: string;
}

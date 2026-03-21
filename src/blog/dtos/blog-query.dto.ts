import { GeneralQueryDto } from '../../shared/dtos/general-query.dto';

export enum Sort {
  Title = 'title',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export class BlogQueryDto extends GeneralQueryDto {}

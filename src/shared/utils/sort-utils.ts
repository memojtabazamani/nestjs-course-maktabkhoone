import { Sort } from '../dtos/general-query.dto';
export const sortFunction = (sort?: Sort): any => {
  if (sort === Sort.Title) return { title: 1 };
  if (sort === Sort.CreatedAt) return { createdAt: -1 };
  return { updatedAt: -1 };
};

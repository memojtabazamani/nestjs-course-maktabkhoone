import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogCategory } from '../schemas/blog-category.schema';
import { BlogCategoryQueryDto } from '../dtos/BlogCategoryQueryDto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BlogQueryDto, Sort } from '../dtos/blog-query.dto';
import { sortFunction } from '../../shared/utils/sort-utils';
import { BlogDto } from '../dtos/blog.dto';
import {BlogCategoryDto} from '../dtos/blog-category.dto';
import { deleteImage } from '../../shared/utils/file-utils';
@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectModel(BlogCategory.name)
    private readonly blogCategoryModel: Model<BlogCategory>,
  ) {}

  async findAll(
    queryParams: BlogCategoryQueryDto,
    selectObject: any = {
      __v: false,
    },
  ) {
    const { limit = 10, page = 1, title } = queryParams;
    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    let sort: Sort | undefined = queryParams.sort;

    // now supports undefined safely
    const sortObject = sortFunction(sort);
    const categories = await this.blogCategoryModel
      .find(query)
      .skip(page - 1)
      .sort(sortObject)
      .select(selectObject)
      .limit(limit)
      .exec();

    const counts = await this.blogCategoryModel.countDocuments(query);

    return {
      counts,
      categories,
    };
  }

  async findOne(
    id: string,
    selectObject: any = {
      __v: false,
    },
  ) {
    const category = await this.blogCategoryModel
      .findOne({ _id: id })
      .select(selectObject)
      .exec();
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async create(body: BlogCategoryDto) {
    const newCategory = new this.blogCategoryModel(body);
    await newCategory.save();
    return newCategory;
  }

  async update(id: string, body: BlogCategoryDto) {
    const blogCategory = await this.findOne(id, { __id: true, image: 1 });
    if (!blogCategory) {
      throw new NotFoundException();
    }
    if (blogCategory.image !== body.image) {
      await deleteImage(blogCategory.image, 'blogCategory');
    }
    return await this.blogCategoryModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }
  async delete(id: string) {
    const blogCategory = await this.findOne(id);
    if (!blogCategory) {
      throw new NotFoundException();
    }
    await deleteImage(blogCategory.image, 'blogCategory');
    await blogCategory.deleteOne();

    return blogCategory;
  }
}

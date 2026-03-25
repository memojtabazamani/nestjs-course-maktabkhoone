import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from '../dtos/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from '../schemas/blog-schema';
import { Model } from 'mongoose';
import { BlogQueryDto, Sort } from '../dtos/blog-query.dto';
import { sortFunction } from '../../shared/utils/sort-utils';
import { deleteImage } from '../../shared/utils/file-utils';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll(
    queryParams: BlogQueryDto,
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
    console.log('service');
    // now supports undefined safely
    const sortObject = sortFunction(sort);
    const blogs = await this.blogModel
      .find(query)
      .populate('category', {
        title: true,
      })
      .skip(page - 1)
      .sort(sortObject)
      .select(selectObject)
      .limit(limit)
      .exec();

    const counts = await this.blogModel.countDocuments(query);

    return {
      counts,
      blogs,
    };
  }

  async findOne(
    id: string,
    selectObject: any = {
      __v: false,
    },
  ) {
    const blog = await this.blogModel
      .findOne({ _id: id })
      .populate('category', {
        title: true,
      })
      .select(selectObject)
      .exec();
    if (!blog) {
      throw new NotFoundException();
    }
    return blog;
  }

  async create(body: BlogDto) {
    const newBlog = new this.blogModel(body);
    await newBlog.save();
    return newBlog;
  }

  async update(id: string, body: BlogDto) {
    const blog = await this.findOne(id, { __id: true, image: 1 });
    if (!blog) {
      throw new NotFoundException();
    }
    if (blog.image !== body.image) {
      await deleteImage(blog.image, 'blog');
    }
    return await this.blogModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async delete(id: string) {
    const blog = await this.findOne(id, { __id: true, image: 1 });
    if (!blog) {
      throw new NotFoundException();
    }
    await deleteImage(blog.image, 'blog');
    await blog.deleteOne();

    return blog;
  }
}

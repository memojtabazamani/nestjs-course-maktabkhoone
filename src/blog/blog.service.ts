import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from '../blog-schema';
import { Model } from 'mongoose';
import { BlogQueryDto } from './dtos/blog-query.dto';
@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll(queryParams: BlogQueryDto) {
    const { limit = 10, page = 1, title } = queryParams;

    // const pageNum = Number(page) || 1;
    // const limitNum = Number(limit) || 10;

    const query: any = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    const blogs = await this.blogModel
      .find(query)
      .skip(page - 1)
      .limit(limit)
      .exec();

    const counts = await this.blogModel.countDocuments(query);

    return {
      counts,
      blogs,
    };
  }

  async findOne(id: string) {
    const blog = await this.blogModel.findOne({ _id: id }).exec();
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
    const blog = await this.findOne(id);
    if (!blog) {
      throw new NotFoundException();
    }
    blog.title = body.title;
    blog.content = body.content;
    await blog.save();
    return blog;
  }

  async delete(id: string) {
    const blog = await this.findOne(id);
    if (!blog) {
      throw new NotFoundException();
    }
    await blog.deleteOne();
  }
}

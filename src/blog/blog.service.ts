import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';

@Injectable()
export class BlogService {
  private blogs = [
    {
      _id: 1,
      title: 'title1',
      content: 'content1',
    },
    {
      _id: 2,
      title: 'title2',
      content: 'content2',
    },
  ];

  findAll() {
    return this.blogs;
  }

  findOne(id: string) {
    const blog = this.blogs.find((i) => i._id.toString() === id.toString());
    if (!blog) {
      throw new NotFoundException();
    }
    return blog;
  }

  create(body: BlogDto) {
    const id = Math.random();
    const newBlog = { ...body, _id: id };

    this.blogs.push(newBlog);
    return newBlog;
  }

  update(id: string, body: BlogDto) {
    const blog = this.findOne(id);
    if (!blog) {
      throw new NotFoundException();
    }
    blog.title = body.title;
    blog.content = body.content;

    return blog;
  }

  delete(id: string) {
    const blog = this.findOne(id);
    if (!blog) {
      throw new NotFoundException();
    }
    const newBlogs = this.blogs.filter(
      (i) => i._id.toString() !== id.toString(),
    );
    this.blogs = newBlogs;
  }
}

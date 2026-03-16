import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogDto } from './dtos/blog.dto';
import { BlogService } from './blog.service';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get()
  findAll(@Query() queryParams) {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOn(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Post()
  create(@Body() body: BlogDto) {
    return this.blogService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: BlogDto) {
    return this.blogService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}

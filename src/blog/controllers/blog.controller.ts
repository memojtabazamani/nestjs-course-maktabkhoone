import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { BlogDto } from '../dtos/blog.dto';
import { BlogService } from '../services/blog.service';
import { BlogQueryDto } from '../dtos/blog-query.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { JwtGuard } from '../../shared/guards/jwt.guard';

@ApiTags('Blog')
@Controller('blog')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get()
  findAll(@Query() queryParams: BlogQueryDto) {
    return this.blogService.findAll(queryParams);
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
  update(@Param('id') id: string, @Body() body: UpdateBlogDto) {
    return this.blogService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}

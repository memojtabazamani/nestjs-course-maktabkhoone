import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlogCategoryDto } from '../dtos/blog-category.dto';
import { BlogCategoryService } from '../services/blog-category.service';
import { BlogCategoryQueryDto } from '../dtos/BlogCategoryQueryDto';
import { UpdateBlogCategoryDto } from '../dtos/update-blog-category.dto';
import { JwtGuard } from '../../shared/guards/jwt.guard';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Role } from '../../user/schemas/user.schema';

@ApiTags('Category')
@Controller('blog-category')
@UseGuards(JwtGuard, new RoleGuard([Role.Admin, Role.CopyRighter]))
@ApiBearerAuth()
export class BlogCategoryController {
  constructor(private readonly blogCategoryService: BlogCategoryService) {}
  @Get()
  findAll(@Query() queryParams: BlogCategoryQueryDto) {
    return this.blogCategoryService.findAll(queryParams);
  }

  @Get(':id')
  findOn(@Param('id') id: string) {
    return this.blogCategoryService.findOne(id);
  }

  @Post()
  create(@Body() body: BlogCategoryDto) {
    return this.blogCategoryService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateBlogCategoryDto) {
    return this.blogCategoryService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogCategoryService.delete(id);
  }
}

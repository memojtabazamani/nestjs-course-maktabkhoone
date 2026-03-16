import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  @Get()
  findAll(@Query() queryParams) {
    return 'Find All Blogs';
  }

  @Get('category')
  findAllCategories() {
    return 'Find All Categories';
  }

  @Get(':id')
  findOn(@Param('id') id: string) {
    return 'Category ID: ' + id;
  }

  @Post()
  create(@Body('title') body) {
    console.log(body);
    return 'Create Blog';
  }

  @Patch(':id')
  update(@Param("id") id: string, @Body() body) {
    console.log(id, body);
    return 'Update Blog';
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    console.log(id);
    return 'Delete Blog';
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { UserQueryDto } from '../dtos/user-query.dto';
import { FarsiPipe } from '../../shared/pipes/farsi.pipe';
import { MobilePipe } from '../../shared/pipes/mobile.pipe';
import { PasswordPipe } from '../../shared/pipes/password.pipe';
import { PasswordInterceptor } from '../../shared/interceptors/password.interceptor';
import { UpdateUserDto } from '../dtos/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(@Query() queryParams: UserQueryDto) {
    return this.userService.findAll(queryParams);
  }

  @Post()
  @UseInterceptors(PasswordInterceptor)
  create(@Body(FarsiPipe, MobilePipe, PasswordPipe) body: UserDto) {
    return this.userService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(PasswordInterceptor)
  update(
    @Param('id') id: string,
    @Body(FarsiPipe, MobilePipe, PasswordPipe) body: UpdateUserDto,
  ) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

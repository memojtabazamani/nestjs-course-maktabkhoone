import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dtos/auth.dto';
import { MobilePipe } from '../../shared/pipes/mobile.pipe';
import { PasswordPipe } from '../../shared/pipes/password.pipe';
import { UserService } from '../services/user.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {
  }
  @Post('sign-in')
  async signin(@Body(MobilePipe, new PasswordPipe(false)) body: AuthDto) {
    return await this.userService.signin(body);
  }
}

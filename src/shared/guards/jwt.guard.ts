import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const token: any = request?.headers?.authorization?.split(' ')[1];
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = {
        _id: payload?._id,
        role: payload?.role,
      };
      return true;
    } catch (error) {
      return false;
    }
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest();
    const apikey: any = request.headers.apikey;
    if (apikey === process.env.API_KEY) {
      return true;
    } else {
      return false;
    }
    return true;
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AppService } from '../../app.service';
import { LogType } from '../schemas/log.schema';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly appService: AppService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      tap(async (res) => {
        if (request.method !== 'GET') {
          await this.appService.log({
            content: JSON.stringify(res),
            url: request.url,
            type: LogType[request.method],
            user: request['user']?._id || null,
          });
        }
      }),
    );
  }
}

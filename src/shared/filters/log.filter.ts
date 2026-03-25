import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../../app.service';
import { LogType } from '../schemas/log.schema';

@Catch(HttpException)
export class LogFilter<T extends HttpException> implements ExceptionFilter {
  constructor(private readonly appService: AppService) {}
  async catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    if (status === 404) {
      response.status(404).send({
        statusCode: 404,
        message: 'Self Message',
      });
    } else {
      response.send(exception.getResponse());
    }
    await this.appService.log({
      type: LogType.Error,
      content: JSON.stringify(exception.getResponse()),
    });
    console.log(exception);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, logSchema } from './shared/schemas/log.schema';
import { LogDto } from './shared/dtos/log.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Log.name) private readonly logModel: Model<Log>) {}
  async log(body: LogDto) {
    const newLog = new this.logModel(body);
    await newLog.save();
    return newLog;
  }
}

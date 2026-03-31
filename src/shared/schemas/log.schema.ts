import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { type } from 'os';
export enum LogType {
  Error = 'error',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
}
export class Log extends Document {
  @Prop()
  content: string;
  @Prop()
  type: LogType;
  @Prop()
  url: string;
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: false,
  })
  user: User;
}
export const logSchema = SchemaFactory.createForClass(Log);

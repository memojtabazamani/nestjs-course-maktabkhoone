import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
}
export const logSchema = SchemaFactory.createForClass(Log);
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum LogType {
  Error = 'error',
}
export class Log extends Document {
  @Prop()
  content: string;
  @Prop()
  type: LogType;
}
export const logSchema = SchemaFactory.createForClass(Log);
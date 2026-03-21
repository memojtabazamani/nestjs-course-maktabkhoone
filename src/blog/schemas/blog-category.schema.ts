import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class BlogCategory extends Document {
  @Prop()
  title: string;
  @Prop()
  content: string;
}

export const blogCategorySchema = SchemaFactory.createForClass(BlogCategory);

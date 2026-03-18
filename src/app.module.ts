import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';

// Decorator
@Module({
  imports: [BlogModule, MongooseModule.forRoot("")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

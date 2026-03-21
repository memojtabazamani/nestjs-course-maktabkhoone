import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogController } from './blog/controllers/blog.controller';
import { BlogService } from './blog/services/blog.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';

// Decorator
@Module({
  imports: [
    BlogModule,
    MongooseModule.forRoot(
      'mongodb://admin:zcHDHqpv9u4JO8nLXtyt@remote-pishgaman.runflare.com:30915/admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

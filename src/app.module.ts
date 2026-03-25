import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { LogFilter } from './shared/filters/log.filter';
import { Log, logSchema } from './shared/schemas/log.schema';
import { ConfigModule } from '@nestjs/config';

// Decorator
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV || '.env',
    }),
    BlogModule,
    MongooseModule.forRoot(process.env.DB_URL || 'url'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/fiels',
    }),
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: logSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: LogFilter,
    },
  ],
})
export class AppModule {}

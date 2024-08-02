import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest_4'), UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

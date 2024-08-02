import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/entities/user.entity';
import { JoiPipeModule } from 'nestjs-joi';
import { PostSchema } from './entities/post.entity';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'User',schema:UserSchema},
    {name:'Post',schema:PostSchema},
  ]), JoiPipeModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Post') private postModel: Model<Post>
  ) { }

  async create(createPostDto: CreatePostDto) {
    const {userId, ...data}=createPostDto
    const user = await this.userModel.findOne({_id:userId})
    if (user) {
      const post=await this.postModel.create({...data,user})
      await this.userModel.findByIdAndUpdate(userId,{posts:[...user.posts,post]})
      return post
    } else {
      throw new NotFoundException('not found')
    }
  }

  async findAll() {
    return this.postModel.find();
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).populate("user")
    if (post) {
      return post
    } else {
      throw new NotFoundException('not found')
    }
  }

  async update(id: string, updatePostDto: CreatePostDto) {
    const post = await this.postModel.findById(id)
    if (post) {
      const {userId, ...data}=updatePostDto;
      if (userId) {
        const user = await this.userModel.findOne({_id:userId})
        if (user) {
          await this.postModel.findByIdAndUpdate(id, {...data, user})
          return post
        } else {
          throw new NotFoundException('user not found')
        }
      }else{
        await this.postModel.findByIdAndUpdate(id, updatePostDto)
        return await this.postModel.findById(id)
      }
    } else {
      throw new NotFoundException('post not found')
    }
  }

  async remove(id: string) {
    const post = await this.postModel.findById(id).populate("user")
    if (post) {
      await this.postModel.findByIdAndDelete(id)
      await this.userModel.findByIdAndUpdate(post.user,{posts:[...post.user.posts.filter(elm=>elm!=post)]})
      return true
    } else {
      return false
    }
  }
}

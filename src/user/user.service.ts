import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) { }
  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto)
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).populate("posts")
    if (user) {
      return user
    } else {
      throw new NotFoundException('not found')
    }
  }

  async update(id: string, updateUserDto: CreateUserDto) {
    const user = await this.userModel.findById(id)
    if (user) {
      await this.userModel.findByIdAndUpdate(id, updateUserDto)
      return await this.userModel.findById(id)
    } else {
      throw new NotFoundException('not found')
    }
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id)
    if (user) {
      await this.userModel.findByIdAndDelete(id)
      return true
    } else {
      return false
    }
  }
}

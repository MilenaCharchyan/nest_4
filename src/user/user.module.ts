import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports:[MongooseModule.forFeature([{
    name:'User',schema:UserSchema
  }]), JoiPipeModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

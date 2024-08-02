import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  age: number;

  @Prop([Number])
  rating: number[];


  @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Post'}]})
  posts:Post[]
}

export const UserSchema = SchemaFactory.createForClass(User);

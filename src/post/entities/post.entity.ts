import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  user:User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Course } from '../courses/course.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

@Schema({ timestamps: true })
@ObjectType()
export class CourseLike extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop({ type: ObjectId, ref: Course.name, required: true })
  @Field(() => String)
  course: Course | mongoose.Types.ObjectId;

  @Prop({ type: ObjectId, ref: User.name, required: true })
  @Field(() => String)
  user: User | mongoose.Types.ObjectId;

  @Prop({
    type: ObjectId,
    ref: 'User',
  })
  createdBy: User | mongoose.Types.ObjectId;

  @Prop({
    type: ObjectId,
    ref: 'User',
  })
  updatedBy: User | mongoose.Types.ObjectId;
}

export const CourseLikeSchema = SchemaFactory.createForClass(CourseLike);

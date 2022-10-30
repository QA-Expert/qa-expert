import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import * as mongoose from 'mongoose';
import { CourseProgress } from '../course-progresses/course-progress.schema';

// @typescript-eslint/no-unused-vars
const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class CoursePage extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop()
  content: string;

  @Field(() => CourseProgress, { nullable: true })
  progress?: CourseProgress;

  @Prop({
    type: ObjectId,
    ref: User.name,
  })
  createdBy: User | mongoose.Types.ObjectId;

  @Prop({
    type: ObjectId,
    ref: User.name,
  })
  updatedBy: User | mongoose.Types.ObjectId;
}

export const CoursePageSchema = SchemaFactory.createForClass(CoursePage);

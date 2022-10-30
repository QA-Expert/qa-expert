import { Field, ObjectType } from '@nestjs/graphql';
import { CoursePage } from '../course-pages/course-page.schema';
import { Course } from '../courses/course.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import * as mongoose from 'mongoose';

// @typescript-eslint/no-unused-vars
const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class CourseProgress extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop({ type: ObjectId, ref: Course.name })
  @Field(() => String)
  course: Course | mongoose.Types.ObjectId;

  @Prop({ type: ObjectId, ref: CoursePage.name })
  @Field(() => String)
  coursePage: CoursePage | mongoose.Types.ObjectId;

  @Prop({ type: ObjectId, ref: User.name })
  @Field(() => String)
  user: User | mongoose.Types.ObjectId;

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

export const CourseProgressSchema =
  SchemaFactory.createForClass(CourseProgress);

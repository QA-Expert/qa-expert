import { Field, ObjectType } from '@nestjs/graphql';
import { CoursePage } from '../course-pages/course-page.schema';
import { Course } from '../courses/course.schema';
import { Meta } from '../common/meta.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

// @typescript-eslint/no-unused-vars
const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema()
@ObjectType()
export class CourseProgress extends Document {
  @Prop({ type: ObjectId, ref: Course.name })
  @Field()
  course: typeof ObjectId;

  @Prop({ type: ObjectId, ref: CoursePage.name })
  @Field()
  coursePage: typeof ObjectId;

  @Prop({ type: ObjectId, ref: User.name })
  @Field()
  user: typeof ObjectId;

  @Prop({ type: Meta })
  meta: Meta;
}

export const CourseProgressSchema =
  SchemaFactory.createForClass(CourseProgress);

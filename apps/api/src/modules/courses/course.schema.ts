import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Page } from '../pages/page.schema';
import { Badge } from '../badges/badge.schema';
import { TotalCourseProgress } from '../course-progresses/course-progress.schema';

export enum CourseType {
  COURSE = 'course',
  QUIZ = 'quiz',
}
registerEnumType(CourseType, {
  name: 'CourseType',
  description: 'Defines the type of the course',
});

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class Course extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Field({ description: 'Course title' })
  @Prop()
  title: string;

  @Field({ description: 'Course description' })
  @Prop()
  description: string;

  @Prop({ type: String, enum: CourseType, required: true })
  @Field(() => CourseType)
  type: CourseType;

  @Field({ description: 'Icon url' })
  @Prop()
  icon: string;

  @Prop({ type: [{ type: ObjectId, ref: Page.name }], default: [] })
  @Field(() => [Page], {
    defaultValue: [],
    description: 'Pages included in course',
  })
  pages: Page[];

  @Field(() => TotalCourseProgress, { description: 'Course progress' })
  progress: TotalCourseProgress;

  @Field(() => Badge, {
    nullable: true,
    description: 'Achievement upon successful completion of course',
  })
  badge: Badge;

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

export const CourseSchema = SchemaFactory.createForClass(Course);

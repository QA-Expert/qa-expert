import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Course, CourseType } from '../courses/course.schema';
import { PageProgress } from '../page-progresses/page-progress.schema';

export enum CourseProgressState {
  PASS = 'pass',
  FAIL = 'fail',
  IN_PROGRESS = 'in_progress',
}

registerEnumType(CourseProgressState, {
  name: 'CourseProgressState',
  description: 'Defines the state of course progress',
});

@ObjectType()
export class TotalCourseProgress {
  @Field({ defaultValue: 0, description: 'Passed course pages count' })
  pass: number;

  @Field({ defaultValue: 0, description: 'Failed course pages count' })
  fail: number;

  @Field(() => CourseProgressState, {
    defaultValue: CourseProgressState.IN_PROGRESS,
  })
  state: CourseProgressState;

  @Field({ nullable: true, description: 'Course pages count before finish course' })
  pagesLeftBeforeFinish: number;

  @Field(() => Date, { defaultValue: new Date() })
  updatedAt: Date;
}

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class CourseProgress {
  @Field(() => String)
  _id: string;

  @Prop({ required: true })
  @Field(() => CourseType, { description: 'Can be theory or quiz'})
  type: CourseType;

  @Prop({ required: true })
  @Field({ defaultValue: 0, description: 'Course failed in percent' })
  fail: number;

  @Prop({ required: true })
  @Field({ defaultValue: 0, description: 'Course passed in percent' })
  pass: number;

  @Prop({ type: String, enum: CourseProgressState, required: true })
  @Field(() => CourseProgressState, {
    defaultValue: CourseProgressState.IN_PROGRESS,
  })
  state: CourseProgressState;

  @Prop({ type: ObjectId, ref: 'Course', required: true })
  @Field(() => Course)
  course: Course | mongoose.Types.ObjectId;

  @Prop({ type: ObjectId, ref: 'User', required: true })
  @Field(() => String)
  user: User | mongoose.Types.ObjectId;

  @Prop({
    type: [{ type: ObjectId, ref: PageProgress.name, required: true }],
  })
  @Field(() => Course)
  pageProgresses: PageProgress[] | mongoose.Types.ObjectId[];

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

  @Prop()
  @Field()
  updatedAt: Date;
}

export const CourseProgressSchema =
  SchemaFactory.createForClass(CourseProgress);

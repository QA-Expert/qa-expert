import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Course, CourseType } from '../courses/course.schema';

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
  @Field({ defaultValue: 0 })
  pass: number;

  @Field({ defaultValue: 0 })
  fail: number;

  @Field({ defaultValue: CourseProgressState.IN_PROGRESS })
  state: CourseProgressState;
}

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class CourseProgress {
  @Field(() => String)
  _id: string;

  @Prop({ type: String, enum: CourseType, required: true })
  @Field(() => CourseType)
  type: CourseType;

  @Field({ defaultValue: 0 })
  fail: number;

  @Field({ defaultValue: 0 })
  pass: number;

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
  createdAt: Date;
}

export const CourseProgressSchema =
  SchemaFactory.createForClass(CourseProgress);

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Page } from '../pages/page.schema';
import { Badge } from '../badges/badge.schema';

export enum CourseType {
  COURSE = 'course',
  QUIZ = 'quiz',
}

export enum CourseProgressState {
  PASS = 'pass',
  FAIL = 'fail',
  IN_PROGRESS = 'in_progress',
}

registerEnumType(CourseType, {
  name: 'CourseType',
  description: 'Defines the type of the course',
});

registerEnumType(CourseProgressState, {
  name: 'CourseProgressState',
  description: 'Defines the state of course progress',
});

@ObjectType()
export class CourseProgress {
  @Field({ defaultValue: 0 })
  fail: number;

  @Field({ defaultValue: 0 })
  pass: number;

  @Field(() => CourseProgressState, {
    defaultValue: CourseProgressState.IN_PROGRESS,
  })
  state: CourseProgressState;

  @Field(() => Date, { defaultValue: new Date() })
  submittedAt: Date;
}

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class Course extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  description: string;

  @Prop({ type: String, enum: CourseType, required: true })
  @Field(() => CourseType)
  type: CourseType;

  @Field()
  @Prop()
  icon: string;

  @Prop({ type: [{ type: ObjectId, ref: Page.name }] })
  @Field(() => [Page])
  pages: Page[];

  @Field(() => CourseProgress, {
    defaultValue: {
      fail: 0,
      pass: 0,
      state: CourseProgressState.IN_PROGRESS,
      submittedAt: new Date(),
    },
  })
  progress: CourseProgress;

  @Field(() => Badge, { nullable: true })
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

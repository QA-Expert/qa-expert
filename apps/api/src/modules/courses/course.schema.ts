import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Page } from '../pages/page.schema';
import { Badge } from '../badge/badge.schema';
@ObjectType()
export class ProgressPercentage {
  @Field({ defaultValue: 0 })
  fail: number;
  @Field({ defaultValue: 0 })
  pass: number;
}

export enum CourseType {
  COURSE = 'course',
  QUIZ = 'quiz',
}

registerEnumType(CourseType, {
  name: 'CourseType',
  description: 'Defines the type of the course',
});

// @typescript-eslint/no-unused-vars
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

  @Field(() => ProgressPercentage, { defaultValue: { fail: 0, pass: 0 } })
  progress: ProgressPercentage;

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

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Answer } from '../answers/answer.schema';
import { Course, CourseType } from '../courses/course.schema';
import { Page } from '../pages/page.schema';
import { User } from '../users/user.schema';
import { QuestionType } from '../questions/question.schema';

export enum PageProgressState {
  PASS = 'pass',
  FAIL = 'fail',
}

registerEnumType(PageProgressState, {
  name: 'PageProgressState',
  description:
    'Defines whether User passed or failed or just visited current page',
});

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class PageProgress extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop({ type: String, enum: PageProgressState, required: true })
  @Field(() => PageProgressState)
  state: PageProgressState;

  @Prop({ type: String, enum: CourseType, required: true })
  @Field(() => CourseType, {
    description: 'Type of the course - theoretical course or quiz',
  })
  type: CourseType;

  @Prop({ type: String, enum: QuestionType, required: true })
  @Field(() => QuestionType, {
    description: 'Type of the question',
  })
  questionType: QuestionType;

  @Prop({ type: ObjectId, ref: 'Page', required: true })
  @Field(() => String)
  page: Page | mongoose.Types.ObjectId;

  @Prop({ type: ObjectId, ref: 'Course', required: true })
  @Field(() => String)
  course: Course | mongoose.Types.ObjectId;

  @Prop({
    type: [
      {
        type: ObjectId,
        ref: 'Answer',
      },
    ],
  })
  @Field(() => [String], {
    defaultValue: [],
    description: 'Array of answers used if page is quiz',
    nullable: true,
  })
  answers: Answer[] | mongoose.Types.ObjectId[];

  @Prop({
    type: String,
  })
  @Field(() => String, {
    description:
      "Stringified user's answer data when user answers complex open answer question like TEST_CASE, REST_API etc",
    nullable: true,
  })
  data: string;

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
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PageProgressSchema = SchemaFactory.createForClass(PageProgress);

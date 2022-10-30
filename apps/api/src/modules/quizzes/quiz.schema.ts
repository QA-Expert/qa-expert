import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { QuizPage } from '../quiz-pages/quiz-page.schema';
import { Course } from '../courses/course.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { ProgressPercentage } from '../common/common';

export enum QuizType {
  QUESTIONER = 'questioner',
  PRACTICE = 'practice',
}

registerEnumType(QuizType, {
  name: 'QuizType',
  description: 'Defines different type of quizzes platform could have',
});

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class Quiz extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  description: string;

  @Prop()
  @Field()
  icon: string;

  @Prop({ type: String, enum: QuizType })
  @Field(() => QuizType)
  type: QuizType;

  @Prop({ type: [{ type: ObjectId, ref: QuizPage.name }] })
  @Field(() => [QuizPage])
  quizPages: QuizPage[];

  @Prop({ type: [{ type: ObjectId, ref: 'Course' }] })
  @Field(() => [Course])
  courses: Course[];

  @Prop()
  @Field()
  expectedResult: string;

  @Field(() => ProgressPercentage)
  progress: ProgressPercentage;

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

export const QuizSchema = SchemaFactory.createForClass(Quiz);

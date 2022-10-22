import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { QuizPage } from '../quiz-pages/quiz-page.schema';
import { Course } from '../courses/course.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Meta } from '../common/meta.schema';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export enum QuizType {
  QUESTIONEER = 'Questioneer',
  PRACTICE = 'Practice',
}

registerEnumType(QuizType, {
  name: 'QuizType',
  description: 'Defines different type of quizzes platform could have',
});

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema()
@ObjectType()
export class Quiz extends Document {
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

  @Prop({ type: [{ type: ObjectId, ref: Course.name }] })
  @Field(() => [Course])
  courses: Course[];

  @Prop()
  @Field()
  expectedResult: string;

  @Prop({ type: Meta })
  meta: Meta;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

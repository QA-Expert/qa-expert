import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Answer } from '../answers/answer.schema';
import { QuizPage } from '../quiz-pages/quiz-page.schema';
import { Quiz } from '../quizzes/quiz.schema';
import { User } from '../users/user.schema';

export enum QuizPageProgressState {
  PASS = 'pass',
  FAIL = 'fail',
}

registerEnumType(QuizPageProgressState, {
  name: 'QuizPageProgressState',
  description:
    'Defines whether User passed or failed or just visited current quiz page',
});

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class QuizProgress extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop({ type: String, enum: QuizPageProgressState })
  @Field(() => QuizPageProgressState)
  state: QuizPageProgressState;

  @Prop({ type: ObjectId, ref: 'Quiz' })
  @Field(() => String)
  quiz: Quiz | mongoose.Types.ObjectId;

  @Prop({ type: ObjectId, ref: 'QuizPage' })
  @Field(() => String)
  quizPage: QuizPage | mongoose.Types.ObjectId;

  @Prop({ type: [{ type: ObjectId, ref: Answer.name }] })
  @Field(() => [String])
  answers: Answer[] | mongoose.Types.ObjectId[];

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

export const QuizProgressSchema = SchemaFactory.createForClass(QuizProgress);

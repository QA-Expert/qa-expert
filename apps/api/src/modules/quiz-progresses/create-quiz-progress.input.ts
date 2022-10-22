import { Field, InputType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { QuizPageProgressState } from './quiz-progress.schema';

type ObjectId = mongoose.Schema.Types.ObjectId;

@InputType()
export class QuizProgressInput {
  @Field(() => QuizPageProgressState)
  state: QuizPageProgressState;

  @Field(() => String)
  quiz: ObjectId;

  @Field(() => String)
  quizPage: ObjectId;

  @Field(() => [String], { nullable: true })
  answers?: ObjectId[];
}

import { Field, InputType } from '@nestjs/graphql';
import { QuizPageProgressState } from './quiz-progress.schema';

@InputType()
export class QuizProgressInput {
  @Field(() => QuizPageProgressState)
  state: QuizPageProgressState;

  @Field(() => String)
  quiz: string;

  @Field(() => String)
  quizPage: string;

  @Field(() => [String], { nullable: true })
  answers?: string[];
}

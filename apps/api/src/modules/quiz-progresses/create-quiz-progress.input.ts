import { Field, InputType } from '@nestjs/graphql';
import { QuizPageProgressState } from './quiz-progress.entity';
@InputType()
export class QuizProgressInput {
  @Field(() => QuizPageProgressState)
  state: QuizPageProgressState;

  @Field()
  quizId: string;

  @Field()
  quizPageId: string;

  @Field(() => String, { nullable: true })
  userId: string;

  @Field(() => [String], { nullable: true })
  answerIds?: string[];
}

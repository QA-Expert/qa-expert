import { Field, InputType } from '@nestjs/graphql';
import { PageProgressState } from './page-progress.schema';

@InputType()
export class QuizPageProgressInput {
  @Field(() => String)
  page: string;

  @Field(() => String)
  course: string;

  @Field(() => [String])
  answers: string[];

  @Field(() => PageProgressState)
  state: PageProgressState;
}

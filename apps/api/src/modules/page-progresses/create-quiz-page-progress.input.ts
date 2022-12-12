import { Field, InputType } from '@nestjs/graphql';
import { PageProgressState } from './page-progress.schema';

@InputType()
export class QuizPageProgressInput {
  @Field(() => String, { description: 'Page id' })
  page: string;

  @Field(() => String, { description: 'Course id' })
  course: string;

  @Field(() => [String], { description: 'Array answer ids' })
  answers: string[];

  @Field(() => PageProgressState, { description: 'Can be pass or fail' })
  state: PageProgressState;
}

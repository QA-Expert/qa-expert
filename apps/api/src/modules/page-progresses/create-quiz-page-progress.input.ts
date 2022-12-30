import { Field, InputType } from '@nestjs/graphql';
import { PageProgressState } from './page-progress.schema';

@InputType()
export class QuizPageProgressInput {
  @Field(() => String, { description: 'Page id' })
  page: string;

  @Field(() => String, { description: 'Course id' })
  course: string;

  @Field(() => [String], { description: 'Array of answer ids' })
  answers: string[];

  @Field(() => PageProgressState, {
    description:
      'Can be pass or fail. The state comes from the client side after checking the answers. Set it in the database as a result of the answer to the quiz',
  })
  state: PageProgressState;
}

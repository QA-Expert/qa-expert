import { Field, InputType } from '@nestjs/graphql';
import { PageProgressState } from './page-progress.schema';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

@InputType()
export class QuizPageProgressInput {
  @IsNotEmpty()
  @Field(() => String, { description: 'Page id' })
  page: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'Course id' })
  course: string;

  @ArrayNotEmpty()
  @Field(() => [String], { description: 'Array of answer ids' })
  answers: string[];

  @IsNotEmpty()
  @Field(() => PageProgressState, {
    description:
      'Can be pass or fail. The state comes from the client side after checking the answers. Set it in the database as a result of the answer to the quiz',
  })
  state: PageProgressState;
}

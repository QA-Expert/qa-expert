import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { QuestionType } from '../questions/question.schema';

@InputType()
export class QuizPageProgressInput {
  @IsNotEmpty()
  @Field(() => String, { description: 'Page id' })
  page: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'Course id' })
  course: string;

  @IsNotEmpty()
  @Field(() => QuestionType, {
    description:
      'Type of the question. We use it to determine method of validation',
  })
  questionType: QuestionType;

  @IsOptional()
  @Field(() => [String], {
    description:
      'Answer ids that submitted by user only if it is single or multiple choice question',
    nullable: true,
  })
  actualAnswers?: string[];

  @IsOptional()
  @Field(() => [String], {
    description:
      'Expected Answer ids if passed. Should be passed in case of single, multiple choice question or rest api',
    nullable: true,
  })
  expectedAnswers?: string[];

  @IsOptional()
  @Field(() => String, {
    description:
      "Stringified user's answer data when user answers complex open answer question like TEST_CASE, REST_API etc",
    nullable: true,
  })
  stringifiedData?: string;
}

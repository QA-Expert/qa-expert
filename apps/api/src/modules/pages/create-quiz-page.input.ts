import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QuizPageInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  question: string;
}

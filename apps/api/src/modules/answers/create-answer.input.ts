import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class AnswerInput {
  @Field()
  answer: string; // TODO: figure out how to pass boolean, id

  @Field()
  quizPageId: string;

  @Field()
  userId: string;
}

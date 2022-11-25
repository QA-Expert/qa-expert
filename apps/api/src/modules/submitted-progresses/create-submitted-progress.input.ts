import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubmittedProgressInput {
  @Field(() => String)
  course: string;

  @Field()
  progress: number;
}

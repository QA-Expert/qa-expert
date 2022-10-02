import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CoursProgressInput {
  @Field()
  coursId: string;

  @Field()
  coursPageId: string;

  @Field()
  userId: string;
}

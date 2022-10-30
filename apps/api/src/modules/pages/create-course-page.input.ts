import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewCoursePageInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  content: string;
}

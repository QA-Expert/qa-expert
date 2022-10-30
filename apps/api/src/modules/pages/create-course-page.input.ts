import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CoursePageInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  content: string;
}

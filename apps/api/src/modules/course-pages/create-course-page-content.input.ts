import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CoursePageContentInput {
  @Field(() => String)
  content: string;
}

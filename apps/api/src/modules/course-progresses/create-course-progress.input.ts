import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CourseProgressInput {
  @Field(() => String)
  course: string;

  @Field(() => String)
  coursePage: string;
}

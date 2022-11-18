import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CoursePageProgressInput {
  @Field(() => String)
  page: string;

  @Field(() => String)
  course: string;
}

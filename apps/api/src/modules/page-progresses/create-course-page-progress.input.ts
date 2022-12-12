import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CoursePageProgressInput {
  @Field(() => String, { description: 'Page id'})
  page: string;

  @Field(() => String, { description: 'Course id'})
  course: string;
}

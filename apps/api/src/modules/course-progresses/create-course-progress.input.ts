import { Field, InputType } from '@nestjs/graphql';
import { CourseType } from '../courses/course.schema';

@InputType()
export class CourseProgressInput {
  @Field(() => String)
  course: string;

  @Field(() => CourseType)
  type: CourseType;
}

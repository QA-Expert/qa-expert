import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CourseProgressInput {
  @Field()
  courseId: string;

  @Field()
  coursePageId: string;

  @Field()
  userId: string;
}

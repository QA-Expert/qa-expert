import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CoursePageProgressInput {
  @Field(() => String)
  page: string;
}

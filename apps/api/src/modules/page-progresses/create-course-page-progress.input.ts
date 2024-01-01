import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CoursePageProgressInput {
  @IsNotEmpty()
  @Field(() => String, { description: 'Page id' })
  page: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'Course id' })
  course: string;
}

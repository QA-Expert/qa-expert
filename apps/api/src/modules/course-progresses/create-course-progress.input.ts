import { Field, InputType } from '@nestjs/graphql';
import { CourseType } from '../courses/course.schema';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CourseProgressInput {
  @IsNotEmpty()
  @Field(() => String)
  course: string;

  @IsNotEmpty()
  @Field(() => CourseType)
  type: CourseType;

  @IsNotEmpty()
  @Field(() => String)
  pageProgress: string;
}

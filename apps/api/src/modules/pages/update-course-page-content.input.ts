import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CoursePageContentInput {
  @IsNotEmpty()
  @Field(() => String)
  content: string;
}

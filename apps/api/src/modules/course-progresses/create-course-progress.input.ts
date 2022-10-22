import { Field, InputType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

type ObjectId = mongoose.Schema.Types.ObjectId;
@InputType()
export class CourseProgressInput {
  @Field(() => String)
  course: ObjectId;

  @Field(() => String)
  coursePage: ObjectId;

  @Field(() => String)
  user: ObjectId;
}

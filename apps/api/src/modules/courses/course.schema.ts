import { Field, ObjectType } from '@nestjs/graphql';
import { CoursePage } from '../course-pages/course-page.schema';
import { Quiz } from 'src/modules/quizzes/quiz.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Meta } from '../common/meta.schema';
import { Document } from 'mongoose';

// @typescript-eslint/no-unused-vars
const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema()
@ObjectType()
export class Course extends Document {
  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop()
  icon: string;

  @Prop({ type: [{ type: ObjectId, ref: CoursePage.name }] })
  @Field(() => [CoursePage])
  coursePages: CoursePage[];

  @Prop({ type: [{ type: ObjectId, ref: Quiz.name }] })
  @Field(() => [Quiz])
  quizzes: Quiz[];

  @Prop({ type: Meta })
  meta: Meta;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

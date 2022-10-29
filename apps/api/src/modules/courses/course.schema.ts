import { Field, ObjectType } from '@nestjs/graphql';
import { CoursePage } from '../course-pages/course-page.schema';
import { Quiz } from 'src/modules/quizzes/quiz.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../users/user.schema';

// @typescript-eslint/no-unused-vars
const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class Course extends Document {
  @Field(() => String)
  _id: string;

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

  @Prop({
    type: ObjectId,
    ref: User.name,
  })
  createdBy: User | mongoose.Types.ObjectId;

  @Prop({
    type: ObjectId,
    ref: User.name,
  })
  updatedBy: User | mongoose.Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

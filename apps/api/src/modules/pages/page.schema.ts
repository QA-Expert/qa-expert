import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CourseType } from '../courses/course.schema';
import { PageProgress } from '../page-progresses/page-progress.schema';
import { Question } from '../questions/question.schema';
import { User } from '../users/user.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class Page extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop({ type: String, enum: CourseType, required: true })
  @Field(() => CourseType)
  type: CourseType;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field(() => String, { nullable: true })
  @Prop({
    required: function () {
      // TODO: make it type safe
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.type === CourseType.COURSE;
    },
  })
  content?: string;

  @Prop({
    type: ObjectId,
    ref: Question.name,
    required: function () {
      // TODO: make it type safe
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.type === CourseType.QUIZ;
    },
  })
  @Field(() => Question, { nullable: true })
  question?: Question | mongoose.Types.ObjectId;

  @Field(() => PageProgress, { nullable: true })
  progress?: PageProgress;

  @Prop({
    type: ObjectId,
    ref: 'User',
  })
  createdBy: User | mongoose.Types.ObjectId;

  @Prop({
    type: ObjectId,
    ref: 'User',
  })
  updatedBy: User | mongoose.Types.ObjectId;
}

export const PageSchema = SchemaFactory.createForClass(Page);

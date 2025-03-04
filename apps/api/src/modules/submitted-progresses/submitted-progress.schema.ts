import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Course } from '../courses/course.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class SubmittedProgress {
  @Field(() => String)
  _id: string;

  @Prop({ required: true })
  @Field({ description: 'Calculated from course plus quiz progress' })
  totalProgress: number;

  @Prop({ required: true })
  @Field({ description: 'Calculated from submitted course quiz' })
  quizProgress: number;

  @Prop({ required: true })
  @Field({ description: 'Calculated from submitted course theory' })
  courseProgress: number;

  @Prop({ type: ObjectId, ref: 'Course', required: true })
  @Field(() => Course)
  course: Course | mongoose.Types.ObjectId;

  @Prop({ type: ObjectId, ref: User.name, required: true })
  @Field(() => String)
  user: User | mongoose.Types.ObjectId;

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

  @Prop()
  @Field()
  createdAt: Date;
}

export const SubmittedProgressSchema =
  SchemaFactory.createForClass(SubmittedProgress);

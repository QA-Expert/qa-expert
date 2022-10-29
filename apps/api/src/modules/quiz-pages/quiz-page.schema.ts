import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Question } from '../questions/question.schema';
import { QuizProgress } from '../quiz-progresses/quiz-progress.schema';
import { Document } from 'mongoose';
import { User } from '../users/user.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class QuizPage extends Document {
  @Field(() => String)
  _id: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  description: string;

  @Prop({ type: ObjectId, ref: Question.name })
  @Field(() => Question)
  question: Question;

  @Field(() => QuizProgress, { nullable: true })
  progress?: QuizProgress;

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

export const QuizPageSchema = SchemaFactory.createForClass(QuizPage);

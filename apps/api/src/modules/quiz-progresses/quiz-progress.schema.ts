import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Meta } from '../common/meta.schema';

export enum QuizPageProgressState {
  VISITED = 'visited',
  PASS = 'pass',
  FAIL = 'fail',
}

registerEnumType(QuizPageProgressState, {
  name: 'QuizPageProgressState',
  description:
    'Defines whether User passed or failed or just visited current quiz page',
});

export type QuizProgressDocument = QuizProgress & Document;

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema()
@ObjectType()
export class QuizProgress extends Document {
  @Field(() => String)
  _id: string;

  @Prop({ type: String, enum: QuizPageProgressState })
  @Field(() => QuizPageProgressState)
  state: QuizPageProgressState;

  @Prop({ type: ObjectId, ref: 'Quiz' })
  @Field(() => String)
  quiz: typeof ObjectId;

  @Prop({ type: ObjectId, ref: 'QuizPage' })
  @Field(() => String)
  quizPage: typeof ObjectId;

  @Prop({ type: [{ type: ObjectId, ref: 'Answer' }] })
  @Field(() => [String])
  answers: typeof ObjectId[];

  @Prop({ type: ObjectId, ref: 'User' })
  @Field(() => String)
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Meta })
  meta: Meta;
}

export const QuizProgressSchema = SchemaFactory.createForClass(QuizProgress);

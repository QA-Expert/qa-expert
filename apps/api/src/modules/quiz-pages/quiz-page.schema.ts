import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Question } from '../questions/question.schema';
import { QuizProgress } from '../quiz-progresses/quiz-progress.schema';
import { Document } from 'mongoose';
import { Meta } from '../common/meta.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema()
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

  @Prop({ type: [{ type: ObjectId, ref: Question.name }] })
  @Field(() => Question)
  question: Question;

  @Prop({
    type: [{ type: ObjectId, ref: QuizProgress.name }],
  })
  @Field(() => [QuizProgress], { nullable: true })
  progresses: QuizProgress[];

  @Prop({ type: Meta })
  meta: Meta;
}

export const QuizPageSchema = SchemaFactory.createForClass(QuizPage);

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Answer } from '../answers/answer.schema';
import { Document } from 'mongoose';
import { User } from '../users/user.schema';

// @typescript-eslint/no-unused-vars
const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class Question extends Document {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field()
  content: string;

  @Prop({ type: [{ type: ObjectId, ref: Answer.name }] })
  @Field(() => [Answer])
  answers: Answer[];

  @Prop({ type: [{ type: ObjectId, ref: Answer.name }] })
  @Field(() => [Answer])
  options: Answer[];

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

export const QuestionSchema = SchemaFactory.createForClass(Question);

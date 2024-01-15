import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class Answer extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Field({ description: "Answer's content text" })
  @Prop()
  content: string;

  @Prop({
    type: String,
  })
  @Field(() => String, {
    description:
      "Stringified answer data. Set in case of REST_API question or other questions that might be used to compare user's submitted data with",
    nullable: true,
  })
  data?: string;

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

export const AnswerSchema = SchemaFactory.createForClass(Answer);

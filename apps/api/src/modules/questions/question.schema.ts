import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Answer } from '../answers/answer.schema';
import { User } from '../users/user.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class Question extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field()
  content: string;

  @Prop({ type: [{ type: ObjectId, ref: 'Answer' }] })
  @Field(() => [Answer])
  answers: Answer[];

  @Prop({ type: [{ type: ObjectId, ref: 'Answer' }] })
  @Field(() => [Answer])
  options: Answer[];

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

export const QuestionSchema = SchemaFactory.createForClass(Question);

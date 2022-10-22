import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Meta } from '../common/meta.schema';

export type AnswerDocument = Answer & Document;

// TODO: add description to all props
@Schema()
@ObjectType()
export class Answer extends Document {
  @Field()
  @Prop()
  content: string;

  @Prop({ type: Meta })
  meta: Meta;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

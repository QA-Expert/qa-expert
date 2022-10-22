import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Meta } from '../common/meta.schema';

export type CoursePageDocument = CoursePage & Document;

// TODO: add description to all props
@Schema()
@ObjectType()
export class CoursePage extends Document {
  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop()
  content: string;

  @Prop({ type: Meta })
  meta: Meta;
}

export const CoursePageSchema = SchemaFactory.createForClass(CoursePage);

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Course } from '../courses/course.schema';
import { User } from '../users/user.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class Badge extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  description: string;

  @Field({ description: 'Icon url' })
  @Prop()
  icon: string;

  @Prop({ type: ObjectId, ref: 'Course' })
  @Field(() => Course, { nullable: true })
  course?: Course | mongoose.Types.ObjectId;

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

export const BadgeSchema = SchemaFactory.createForClass(Badge);

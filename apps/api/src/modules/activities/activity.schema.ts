import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

export enum ActivityType {
  NUMERIC = 'numeric',
  PERCENTAGE = 'percentage',
  DURATION = 'duration',
}

registerEnumType(ActivityType, {
  name: 'ActivityType',
  description: 'Defines the a type for activity',
});

@Schema({ timestamps: true })
@ObjectType()
export class Activity extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field({ description: 'Activity title' })
  title: string;

  @Prop()
  @Field({ description: 'Activity description' })
  description: string;

  @Prop({ type: [{ type: String, enum: ActivityType }] })
  @Field(() => ActivityType)
  type: ActivityType;

  @Prop()
  @Field({
    description:
      'Activity value. It could be represented as just numeric value, or percentage or duration, depends on the Activity type',
  })
  value: string;

  @Prop({ type: ObjectId, ref: User.name, required: true })
  @Field(() => String)
  user: User | mongoose.Types.ObjectId;

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

export const ActivitySchema = SchemaFactory.createForClass(Activity);

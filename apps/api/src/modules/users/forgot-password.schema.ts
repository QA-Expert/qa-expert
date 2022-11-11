import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

@Schema({ timestamps: true })
@ObjectType()
export class ForgotPassword extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop({
    type: ObjectId,
    ref: User.name,
    required: true,
    index: true,
  })
  @Field(() => User)
  user: User | mongoose.Types.ObjectId;

  @Field()
  @Prop({ required: true, unique: true, index: true })
  token: string;

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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ForgotPasswordSchema =
  SchemaFactory.createForClass(ForgotPassword);

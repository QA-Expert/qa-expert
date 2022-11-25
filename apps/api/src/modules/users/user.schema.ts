import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Badge } from '../badges/badge.schema';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'Defines different type of user roles',
});

const ObjectId = mongoose.Schema.Types.ObjectId;

@Schema({ timestamps: true })
@ObjectType()
export class User extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Field()
  @Prop({ required: true, index: true })
  email: string;

  @Field({ nullable: true })
  @Prop()
  firstName: string;

  @Field({ nullable: true })
  @Prop()
  lastName: string;

  @Prop()
  hashedPassword: string;

  @Prop({ type: [{ type: String, enum: Roles, default: Roles.USER }] })
  @Field(() => [String])
  roles: Roles[];

  @Prop({ type: [{ type: ObjectId, ref: Badge.name }] })
  @Field(() => [String], { nullable: true })
  badges: Badge[] | mongoose.Types.ObjectId[];

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

export const UserSchema = SchemaFactory.createForClass(User);

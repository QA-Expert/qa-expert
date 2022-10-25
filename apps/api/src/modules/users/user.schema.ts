import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Meta } from '../common/meta.schema';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}
@Schema()
@ObjectType()
export class User extends Document {
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
  roles: Roles[];

  @Prop({ type: Meta })
  meta: Meta;
}

export const UserSchema = SchemaFactory.createForClass(User);

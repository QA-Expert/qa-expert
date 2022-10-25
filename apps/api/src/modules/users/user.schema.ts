import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Meta } from '../common/meta.schema';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'Defines different type of user roles',
});

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
  @Field(() => [String])
  roles: Roles[];

  @Prop({ type: Meta })
  meta: Meta;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

export enum SocialProviderType {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}

registerEnumType(SocialProviderType, {
  name: 'SocialAuthProviders',
});

@Schema({ timestamps: true })
@ObjectType()
export class UserSocialProvider extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field({ description: 'Provider id' })
  id: number;

  @Prop()
  @Field({ description: 'User social id' })
  socialId: string;

  @Prop({ type: [{ type: String, enum: SocialProviderType }] })
  @Field(() => SocialProviderType)
  type: SocialProviderType;

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

export const UserSocialProviderSchema =
  SchemaFactory.createForClass(UserSocialProvider);

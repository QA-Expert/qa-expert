import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/user.schema';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELED = 'canceled',
}

registerEnumType(SubscriptionStatus, {
  name: 'SubscriptionStatus',
  description: 'Defines users subscription is active or not',
});

const ObjectId = mongoose.Schema.Types.ObjectId;

@ObjectType()
export class Price {
  @Field(() => String)
  currency: string;

  @Field(() => String)
  id: string;

  @Field(() => Number, { nullable: true, description: 'Amount in cents' })
  amount: number | null;
}

@Schema({ timestamps: true })
@ObjectType()
export class Subscription extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field({
    description:
      'External transaction. Refer to transaction stored on side of Payment Processes like Stripe',
  })
  externalId: string;

  @Prop({ type: String, enum: SubscriptionStatus, required: true })
  @Field(() => SubscriptionStatus, {
    defaultValue: SubscriptionStatus.INACTIVE,
  })
  status: SubscriptionStatus;

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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

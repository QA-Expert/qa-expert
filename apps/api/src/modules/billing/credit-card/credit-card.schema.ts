import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/user.schema';
import { Address } from '../payment-method/payment-method.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

@Schema({ timestamps: true })
@ObjectType()
export class CreditCard extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field({
    description: '[Should be Encrypted] Tokenized value of the credit card',
  })
  cardToken: string;

  @Prop()
  @Field({
    description:
      "[Should be Encrypted] Last four numbers of User's credit card",
  })
  lastFour: string;

  @Prop()
  @Field({
    description: '[Should be Encrypted] Expiration month of the credit card',
  })
  expiryMonth: string;

  @Prop()
  @Field({
    description: '[Should be Encrypted] Expiration year of the credit card',
  })
  expiryYear: string;

  @Prop()
  @Field({
    description:
      '[Should be Encrypted] Card type. Example: VISA, MASTERCARD, AMEX etc',
  })
  cardType: string;

  @Field(() => Address, {
    description:
      '[Should be Encrypted] Billing address. We resolve that property in resolver and not as part of db populate',
  })
  address: Address;

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

export const CreditCardSchema = SchemaFactory.createForClass(CreditCard);

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/user.schema';
import { CreditCard } from '../credit-card/credit-card.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

@Schema({ timestamps: true })
@ObjectType()
export class Transaction extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field({
    description:
      'External transaction. Refer to transaction stored on side of Payment Processes like Stripe',
  })
  externalId: string;

  @Prop()
  @Field({
    description: 'Transaction amount',
  })
  amount: number;

  @Prop()
  @Field({
    description:
      'Transaction currency. Could be represented as currency code like USD',
  })
  currency: string;

  @Prop({ type: ObjectId, ref: User.name, required: true })
  @Field(() => String)
  user: User | mongoose.Types.ObjectId;

  @Prop({ type: ObjectId, ref: CreditCard.name, required: true })
  @Field(() => String)
  creditCard: CreditCard | mongoose.Types.ObjectId;

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

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

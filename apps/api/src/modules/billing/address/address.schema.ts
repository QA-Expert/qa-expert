import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/user.schema';
import { CreditCard } from '../credit-card/credit-card.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

@Schema({ timestamps: true })
@ObjectType()
export class Address extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field({
    description: "[Should be Encrypted] Customer's phone number",
  })
  phoneNumber: string;

  @Prop()
  @Field({
    description: '[Should be Encrypted] Street name',
  })
  streetLine1: string;

  @Prop()
  @Field({
    description: '[Should be Encrypted] Could be apt number',
  })
  streetLine2: string;

  @Prop()
  @Field({
    description: '[Should be Encrypted] City name',
  })
  city: string;

  @Prop()
  @Field({
    description: '[Should be Encrypted] State code or name',
  })
  state: string;

  @Prop()
  @Field({
    description: '[Should be Encrypted] Country code or name',
  })
  country: string;

  @Prop()
  @Field({
    description: '[Should be Encrypted] Zip code',
  })
  zip: string;

  @Prop({ type: ObjectId, ref: 'CreditCard', required: true })
  @Field(() => CreditCard)
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
}

export const AddressSchema = SchemaFactory.createForClass(Address);

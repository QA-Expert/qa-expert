import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/user.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

@Schema({ timestamps: true })
@ObjectType()
export class PaymentMethod extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field({
    description:
      "[Should be Encrypted] external Payment Provider payment method id. Used to pull user's payment method (credit card) from Payment Provider",
  })
  externalId: string;

  @Prop()
  @Field({
    description:
      '[Should be Encrypted] external Payment Provider customer id. Used to pull customer info from Payment Provider',
  })
  externalCustomerId: string;

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

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);

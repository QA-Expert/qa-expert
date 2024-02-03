import { Field, ObjectType } from '@nestjs/graphql';
import Stripe from 'stripe';

@ObjectType()
export class PaymentMethodOutput {
  @Field(() => String)
  cardLast4: string;

  @Field(() => String)
  cardBrand: string;

  @Field(() => String, {
    description:
      'Indicates what type of payment method. Could be card, digital wallet etc.',
  })
  type: Stripe.PaymentMethod.Type;

  @Field(() => String)
  address: string;
}

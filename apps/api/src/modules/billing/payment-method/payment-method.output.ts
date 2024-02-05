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

  // Billing information
  @Field(() => String, { nullable: true })
  fullName?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  line1?: string;

  @Field(() => String, { nullable: true })
  line2?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  state?: string;

  @Field(() => String, { nullable: true })
  postalCode?: string;
}

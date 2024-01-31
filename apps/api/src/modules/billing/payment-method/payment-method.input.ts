import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PaymentMethodInput {
  @IsNotEmpty()
  @Field(() => String, {
    description:
      '[Encoded] Representation of Stripe payment method object. We are sending stringified data to be able to encode the whole thing on client and decode it on back end',
  })
  stringifiedObject: string;
}

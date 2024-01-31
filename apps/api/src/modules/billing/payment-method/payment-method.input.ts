import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PaymentMethodInput {
  @IsNotEmpty()
  @Field(() => String, {
    description: 'Payment Provider Payment Method id',
  })
  paymentMethodId: string;
}

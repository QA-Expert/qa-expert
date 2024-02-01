import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentMethodOutput {
  @Field(() => String)
  cardLast4: string;

  @Field(() => String)
  cardBrand: string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { SubscriptionStatus } from './subscription.schema';

@ObjectType()
export class SubscriptionOutput {
  @Field(() => String)
  _id: string;

  @Field(() => SubscriptionStatus)
  status: SubscriptionStatus;

  @Field(() => Date, { nullable: true })
  nextInvoiceDate: Date | null;

  @Field(() => Date, { nullable: true })
  lastInvoiceDate: Date | null;
}

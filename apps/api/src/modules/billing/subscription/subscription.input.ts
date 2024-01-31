import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class SubscriptionInput {
  @IsNotEmpty()
  @Field(() => String)
  priceId: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  couponId?: string;
}

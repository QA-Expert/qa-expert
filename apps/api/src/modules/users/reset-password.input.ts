import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ResetPasswordInput {
  @Field({ description: 'Confirmed email token' })
  token: string;

  @Field()
  password: string;
}

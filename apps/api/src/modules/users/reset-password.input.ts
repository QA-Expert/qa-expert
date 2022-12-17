import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ResetPasswordInput {
  @Field({ description: 'Token generated while user forgot password' })
  token: string;

  @Field()
  password: string;
}

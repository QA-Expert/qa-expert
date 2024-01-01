import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @IsNotEmpty()
  @Field({ description: 'Token generated while user forgot password' })
  token: string;

  @IsNotEmpty()
  @Field()
  password: string;
}

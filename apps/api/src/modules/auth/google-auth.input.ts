import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class GoogleAuthInput {
  @IsNotEmpty()
  @Field(() => String, {
    description:
      'Code that is received from client and should be used to get user info from google auth api',
  })
  code: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'Scope of the user permissions' })
  scope: string;
}

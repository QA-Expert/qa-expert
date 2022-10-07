import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class UserInputLogin {
  @Field()
  @MaxLength(320)
  email: string;

  @Field()
  password: string;
}

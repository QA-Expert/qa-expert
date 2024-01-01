import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UserInputLogin {
  @Field()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;
}

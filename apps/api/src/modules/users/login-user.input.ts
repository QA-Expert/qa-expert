import { Field, InputType } from '@nestjs/graphql';
import { UserBaseModel } from './user-base.model';
import { MaxLength } from 'class-validator';

@InputType()
export class UserInputLogin extends UserBaseModel {
  @Field()
  @MaxLength(320)
  email: string;

  @Field()
  password: string;
}

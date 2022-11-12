import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInputUpdatePassword {
  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;
}

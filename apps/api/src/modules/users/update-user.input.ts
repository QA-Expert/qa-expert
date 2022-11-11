import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInputUpdate {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  password?: string;
}

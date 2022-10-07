import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutputLogin {
  @Field()
  email: string;

  @Field()
  access_token: string;
}

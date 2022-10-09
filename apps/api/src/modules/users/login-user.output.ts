import { Field, ObjectType } from '@nestjs/graphql';
import { UserBaseModel } from './user-base.model';

@ObjectType({ implements: UserBaseModel })
export class UserOutputLogin extends UserBaseModel {
  @Field()
  access_token?: string;
}

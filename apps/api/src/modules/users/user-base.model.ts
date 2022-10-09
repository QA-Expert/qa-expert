import { Field, InterfaceType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InterfaceType()
export abstract class UserBaseModel {
  @Field()
  @MaxLength(320)
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}

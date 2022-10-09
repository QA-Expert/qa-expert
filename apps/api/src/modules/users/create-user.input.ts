import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
@InputType()
export class UserInputCreate {
  @Field()
  @MaxLength(320)
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  password: string;
}

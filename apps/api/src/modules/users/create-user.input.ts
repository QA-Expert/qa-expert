import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
@InputType()
export class UserInput {
  @Field({ nullable: false })
  @MaxLength(320)
  email: string;

  @Field()
  @MaxLength(100)
  firstName: string;

  @Field()
  @MaxLength(100)
  lastName: string;

  @Field({ nullable: false })
  password: string;
}

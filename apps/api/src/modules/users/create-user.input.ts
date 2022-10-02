import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
@InputType()
export class UserInput {
  @Field()
  @MaxLength(320)
  email: string;

  @Field({ nullable: true })
  @MaxLength(100)
  firstName: string;

  @Field({ nullable: true })
  @MaxLength(100)
  lastName: string;

  @Field()
  password: string;
}

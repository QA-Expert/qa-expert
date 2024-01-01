import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
@InputType()
export class UserInputCreate {
  @Field()
  @IsEmail()
  email: string;

  @IsOptional()
  @Field({ nullable: true })
  firstName?: string;

  @IsOptional()
  @Field({ nullable: true })
  lastName?: string;

  @IsNotEmpty()
  @Field()
  password: string;
}

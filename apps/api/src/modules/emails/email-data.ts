import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class EmailData {
  @IsNotEmpty()
  @Field(() => String)
  from: string;

  @IsNotEmpty()
  @Field(() => String)
  to: string;

  @IsNotEmpty()
  @Field(() => String)
  subject: string;

  @IsNotEmpty()
  @Field(() => String)
  text: string;

  @IsNotEmpty()
  @Field(() => String)
  html: string;
}

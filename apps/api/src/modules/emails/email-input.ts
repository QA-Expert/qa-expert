import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class EmailInput {
  @IsNotEmpty()
  @Field(() => String)
  from: string;

  @IsNotEmpty()
  @Field(() => String)
  subject: string;

  @IsNotEmpty()
  @Field(() => String)
  text: string;
}

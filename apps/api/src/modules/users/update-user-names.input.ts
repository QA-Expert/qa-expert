import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UserInputUpdateNames {
  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  @IsOptional()
  @Field({ nullable: true })
  lastName?: string;
}

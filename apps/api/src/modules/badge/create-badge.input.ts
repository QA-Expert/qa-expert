import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BadgeInputCreate {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  icon: string;

  @Field()
  link: string;

  @Field(() => String, { nullable: true })
  course?: string;
}

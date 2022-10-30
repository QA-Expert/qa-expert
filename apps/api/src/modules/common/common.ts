import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProgressPercentage {
  @Field({ defaultValue: 0 })
  fail: number;
  @Field({ defaultValue: 0 })
  pass: number;
}

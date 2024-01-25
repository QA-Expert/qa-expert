import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SocialProviderType } from './user-social-provider.schema';

@InputType()
export class UserSocialProviderCreateInput {
  @IsNotEmpty()
  @Field(() => Number, { description: 'Provider id' })
  id: number;

  @IsNotEmpty()
  @Field(() => String, { description: 'User social id' })
  socialId: string;

  @IsNotEmpty()
  @Field(() => SocialProviderType, { description: 'Provider type' })
  type: SocialProviderType;

  @IsNotEmpty()
  @Field(() => String, {
    description: 'email coming from Social Provider response',
  })
  email: string;

  @IsOptional()
  @Field({ nullable: true })
  firstName?: string;

  @IsOptional()
  @Field({ nullable: true })
  lastName?: string;
}

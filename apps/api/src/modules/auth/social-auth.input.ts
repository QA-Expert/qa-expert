import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export enum SocialProvider {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}

registerEnumType(SocialProvider, {
  name: 'SocialAuthProviders',
});

@InputType()
export class SocialAuthInput {
  @IsNotEmpty()
  @Field(() => String, {
    description:
      'Access Token that is received from client and should be used to get user info from social auth api',
  })
  accessToken: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'Provider name' })
  provider: SocialProvider;
}

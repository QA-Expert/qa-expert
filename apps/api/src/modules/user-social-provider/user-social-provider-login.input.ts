import { InputType, PickType } from '@nestjs/graphql';
import { UserSocialProviderCreateInput } from './user-social-provider-create.input';

@InputType()
export class UserSocialProviderLoginInput extends PickType(
  UserSocialProviderCreateInput,
  ['id', 'socialId'],
) {}

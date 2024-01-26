import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserSocialProvider,
  UserSocialProviderSchema,
} from './user-social-provider.schema';
import { UserSocialProviderService } from './user-social-provider.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSocialProvider.name, schema: UserSocialProviderSchema },
    ]),
    // @NOTE: fix for circular deps AppModule -> AnswerValidationModule -> UserModule -> AuthModule -> UserModule
    forwardRef(() => UserModule),
  ],
  providers: [UserSocialProviderService, JwtService],
  exports: [UserSocialProviderService],
})
export class UserSocialProviderModule {}

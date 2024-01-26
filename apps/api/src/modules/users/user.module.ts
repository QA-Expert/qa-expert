import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { ForgotPassword, ForgotPasswordSchema } from './forgot-password.schema';
import { ConfigModule } from '../config/config.module';
import { UserSocialProviderModule } from '../user-social-provider/user-social-provider.modules';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ForgotPassword.name, schema: ForgotPasswordSchema },
    ]),
    AuthModule,
    ConfigModule,
    UserSocialProviderModule,
  ],
  providers: [UserService, UserResolver, JwtService],
  exports: [UserService],
})
export class UserModule {}

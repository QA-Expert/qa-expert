import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { ConfigModule } from '../config/config.module';
import { UserSocialProviderModule } from '../user-social-provider/user-social-provider.modules';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    ConfigModule,
    UserSocialProviderModule,
  ],
  providers: [AuthService, JwtService, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}

import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [forwardRef(() => UserModule), PassportModule],
  providers: [AuthService, JwtService, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}

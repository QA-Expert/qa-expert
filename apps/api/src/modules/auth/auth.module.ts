import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => UserModule), PassportModule],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}

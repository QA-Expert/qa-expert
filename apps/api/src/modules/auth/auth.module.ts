import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [forwardRef(() => UserModule), PassportModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtService],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

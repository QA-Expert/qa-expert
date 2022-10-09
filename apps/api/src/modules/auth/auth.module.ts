import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [forwardRef(() => UserModule), PassportModule],
  providers: [AuthService, JwtStrategy, JwtService],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}

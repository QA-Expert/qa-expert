import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';

@Module({
  imports: [UserModule],
  providers: [EmailService, EmailResolver, JwtService],
  exports: [EmailService],
})
export class EmailModule {}

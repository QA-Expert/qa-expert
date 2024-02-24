import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [forwardRef(() => UserModule), ConfigModule],
  providers: [EmailService, EmailResolver, JwtService],
  exports: [EmailService],
})
export class EmailModule {}

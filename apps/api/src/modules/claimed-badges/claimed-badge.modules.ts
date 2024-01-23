import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimedBadge, ClaimedBadgeSchema } from './claimed-badge.schema';
import { ClaimedBadgeService } from './claimed-badge.service';
import { ClaimedBadgeResolver } from './claimed-badge.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClaimedBadge.name, schema: ClaimedBadgeSchema },
    ]),
    UserModule,
  ],
  providers: [ClaimedBadgeService, ClaimedBadgeResolver, JwtService],
  exports: [ClaimedBadgeService],
})
export class ClaimedBadgeModule {}

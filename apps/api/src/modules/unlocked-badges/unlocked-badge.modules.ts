import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UnlockedBadge, UnlockedBadgeSchema } from './unlocked-badge.schema';
import { UnlockedBadgeService } from './unlocked-badge.service';
import { UnlockedBadgeResolver } from './unlocked-badge.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UnlockedBadge.name, schema: UnlockedBadgeSchema },
    ]),
    UserModule,
  ],
  providers: [UnlockedBadgeService, UnlockedBadgeResolver, JwtService],
  exports: [UnlockedBadgeService],
})
export class UnlockedBadgeModule {}

import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Badge, BadgeSchema } from './badge.schema';
import { BadgeService } from './badge.service';
import { BadgeResolver } from './badge.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Badge.name, schema: BadgeSchema }]),
    UserModule,
  ],
  providers: [BadgeService, BadgeResolver, JwtService],
  exports: [],
})
export class BadgeModule {}

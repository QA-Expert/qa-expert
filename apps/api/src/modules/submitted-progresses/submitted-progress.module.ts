import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubmittedProgress,
  SubmittedProgressSchema,
} from './submitted-progress.schema';
import { SubmittedProgressService } from './submitted-progress.service';
import { SubmittedProgressResolver } from './submitted-progress.resolver';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubmittedProgress.name, schema: SubmittedProgressSchema },
    ]),
    UserModule,
    ConfigModule,
  ],
  providers: [SubmittedProgressService, SubmittedProgressResolver, JwtService],
  exports: [SubmittedProgressService],
})
export class SubmittedProgressModule {}

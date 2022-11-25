import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubmittedProgress,
  SubmittedProgressSchema,
} from './submitted-progress.schema';
import { SubmittedProgressService } from './submitted-progress.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubmittedProgress.name, schema: SubmittedProgressSchema },
    ]),
    UserModule,
  ],
  providers: [SubmittedProgressService, JwtService],
  exports: [],
})
export class CourseModule {}

import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubmittedProgress,
  SubmittedProgressSchema,
} from './submitted-progress.schema';
import { SubmittedProgressService } from './submitted-progress.service';
import { SubmittedProgressResolver } from './submitted-progress.resolver';
import { CourseProgressModule } from '../course-progresses/course-progress.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubmittedProgress.name, schema: SubmittedProgressSchema },
    ]),
    UserModule,
    forwardRef(() => CourseProgressModule),
  ],
  providers: [SubmittedProgressService, SubmittedProgressResolver, JwtService],
  exports: [SubmittedProgressService],
})
export class SubmittedProgressModule {}

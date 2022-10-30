import { Module } from '@nestjs/common';
import { CourseProgressService } from './course-progress.service';
import { CourseProgressResolver } from './course-progress.resolver';
import { CourseProgress, CourseProgressSchema } from './course-progress.schema';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseProgress.name, schema: CourseProgressSchema },
    ]),
    UserModule,
  ],
  providers: [CourseProgressService, CourseProgressResolver, JwtService],
  exports: [CourseProgressService],
})
export class CourseProgressModule {}

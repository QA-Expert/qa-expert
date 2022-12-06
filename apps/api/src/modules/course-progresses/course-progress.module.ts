import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseProgress, CourseProgressSchema } from './course-progress.schema';
import { CourseProgressService } from './course-progress.service';
import { PageProgressModule } from '../page-progresses/page-progress.module';
import { CourseModule } from '../courses/course.module';
import { CourseProgressResolver } from './course-progress.resolver';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseProgress.name, schema: CourseProgressSchema },
    ]),
    UserModule,
    PageProgressModule,
    forwardRef(() => CourseModule),
  ],
  providers: [CourseProgressService, CourseProgressResolver, JwtService],
  exports: [CourseProgressService],
})
export class CourseProgressModule {}

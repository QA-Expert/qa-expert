import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseProgress, CourseProgressSchema } from './course-progress.schema';
import { CourseProgressService } from './course-progress.service';
import { PageProgressModule } from '../page-progresses/page-progress.module';
import { CourseModule } from '../courses/course.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseProgress.name, schema: CourseProgressSchema },
    ]),
    PageProgressModule,
    forwardRef(() => CourseModule),
  ],
  providers: [CourseProgressService],
  exports: [CourseProgressService],
})
export class CourseProgressModule {}

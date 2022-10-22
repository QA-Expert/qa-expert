import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursePage, CoursePageSchema } from './course-page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CoursePage.name, schema: CoursePageSchema },
    ]),
  ],
  providers: [],
  exports: [],
})
export class CoursePageModule {}

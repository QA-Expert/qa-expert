import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../users/user.module';
import { CoursePageResolver } from './course-page.resolver';
import { CoursePage, CoursePageSchema } from './course-page.schema';
import { CoursePageService } from './course-page.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CoursePage.name, schema: CoursePageSchema },
    ]),
    UserModule,
  ],
  providers: [CoursePageService, CoursePageResolver, JwtService],
  exports: [],
})
export class CoursePageModule {}

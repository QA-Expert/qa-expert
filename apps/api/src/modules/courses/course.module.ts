import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { Course, CourseSchema } from './course.schema';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { BadgeModule } from '../badges/badge.module';
import { CourseProgressModule } from '../course-progresses/course-progress.module';
import { CourseLikeModule } from '../course-likes/course-likes.modules';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    UserModule,
    CourseProgressModule,
    CourseLikeModule,
    BadgeModule,
  ],
  providers: [CourseService, CourseResolver, JwtService],
  exports: [CourseService],
})
export class CourseModule {}

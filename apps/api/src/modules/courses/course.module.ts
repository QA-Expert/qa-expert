import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CoursResolver } from './course.resolver';
import { Course, CourseSchema } from './course.schema';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    UserModule,
  ],
  providers: [CourseService, CoursResolver, JwtService],
  exports: [],
})
export class CourseModule {}

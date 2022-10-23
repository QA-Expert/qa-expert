import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { Course, CourseSchema } from './course.schema';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    UserModule,
  ],
  providers: [CourseService, CourseResolver, JwtService],
  exports: [],
})
export class CourseModule {}

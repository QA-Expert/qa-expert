import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { CoursResolver } from './course.resolver';
import { Course } from './course.entity';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UserModule],
  providers: [CourseService, CoursResolver, JwtService],
  exports: [],
})
export class CourseModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseProgressService } from './course-progress.service';
import { CourseProgressResolver } from './course-progress.resolver';
import { CourseProgress } from './course-progress.entity';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CourseProgress]), UserModule],
  providers: [CourseProgressService, CourseProgressResolver, JwtService],
  exports: [],
})
export class CourseProgressModule {}

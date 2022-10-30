import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CoursePage } from '../course-pages/course-page.schema';
import { CourseProgressService } from '../course-progresses/course-progress.service';
import { User } from '../users/user.schema';
import { Course } from './course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    private readonly serviceCourseProgress: CourseProgressService,
  ) {}

  async findById(id: string) {
    return await this.courseModel
      .findById(id)
      .populate({
        path: 'coursePages',
        model: CoursePage.name,
      })
      .exec();
  }

  async findAll() {
    return await this.courseModel.find().exec();
  }

  async addPage(courseId: string, pageId: string, userId: string) {
    return await this.courseModel
      .findByIdAndUpdate(courseId, {
        $push: {
          coursePages: new mongoose.Types.ObjectId(pageId),
        },
        updatedBy: new mongoose.Types.ObjectId(userId),
      })
      .exec();
  }

  async findProgress(course: Course, user: User) {
    const initValue = {
      pass: 0,
      fail: 0,
    };

    if (!course?.coursePages.length) {
      return initValue;
    }

    const progresses = await this.serviceCourseProgress.findAll(
      user._id,
      course._id,
    );

    if (!progresses?.length) {
      return initValue;
    }

    const numberOfPassed = progresses?.length;
    const total = course?.coursePages.length ?? 0;

    const pass = Number(((numberOfPassed * 100) / total).toFixed());

    return {
      pass,
      fail: 0,
    };
  }
}

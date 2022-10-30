import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PageProgressState } from '../page-progresses/page-progress.schema';
import { PageProgressService } from '../page-progresses/page-progress.service';
import { Page } from '../pages/page.schema';
import { User } from '../users/user.schema';
import { Course } from './course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    private readonly servicePageProgress: PageProgressService,
  ) {}

  async findById(id: string) {
    return await this.courseModel
      .findById(id)
      .populate({
        path: 'pages',
        model: Page.name,
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
          pages: new mongoose.Types.ObjectId(pageId),
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

    if (!course?.pages.length) {
      return initValue;
    }

    const progresses = await this.servicePageProgress.findAll(
      course?.pages.map((page) => page._id),
      user._id,
    );

    if (!progresses?.length) {
      return initValue;
    }

    const total = course?.pages.length ?? 0;
    const numberOfFailed = progresses?.filter(
      (process) => process.state === PageProgressState.FAIL,
    ).length;
    const numberOfPassed = progresses?.filter(
      (process) => process.state === PageProgressState.PASS,
    ).length;

    const fail = Number(((numberOfFailed * 100) / total).toFixed());
    const pass = Number(((numberOfPassed * 100) / total).toFixed());

    return {
      pass,
      fail,
    };
  }
}

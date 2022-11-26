import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CourseType } from '../courses/course.schema';
import { PageProgressState } from '../page-progresses/page-progress.schema';
import { PageProgressService } from '../page-progresses/page-progress.service';
import { PageService } from '../pages/page.service';
import {
  CourseProgress,
  CourseProgressState,
  TotalCourseProgress,
} from './course-progress.schema';
import { CourseProgressInput } from './create-course-progress.input';

@Injectable()
export class CourseProgressService {
  constructor(
    @InjectModel(CourseProgress.name)
    private courseProgressModel: Model<CourseProgress>,
    private readonly servicePageProgress: PageProgressService,
    private readonly servicePage: PageService,
  ) {}

  async upsert(
    data: CourseProgressInput,
    userId: string,
  ): Promise<CourseProgress> {
    const progresses =
      await this.servicePageProgress.findAllByCourseIdAndTypeAsc(
        data.course,
        data.type,
        userId,
      );
    const total = await this.servicePage.countByCourseIdAndType(
      data.course,
      data.type,
    );
    const numberOfFailed = progresses?.filter(
      (process) => process.state === PageProgressState.FAIL,
    ).length;
    const numberOfPassed = progresses?.filter(
      (process) => process.state === PageProgressState.PASS,
    ).length;

    const fail = Number(((numberOfFailed * 100) / total).toFixed());
    const pass = Number(((numberOfPassed * 100) / total).toFixed());
    const state =
      pass >= 100
        ? CourseProgressState.PASS
        : pass + fail >= 100
        ? CourseProgressState.FAIL
        : CourseProgressState.IN_PROGRESS;

    const newProgress: Partial<CourseProgress> = {
      type: data.type,
      state,
      fail,
      pass,
      course: new mongoose.Types.ObjectId(data.course),
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    return await this.courseProgressModel.findOneAndUpdate(
      {
        course: { _id: data.course },
        user: { _id: userId },
      },
      newProgress,
      { upsert: true, new: true },
    );
  }

  async findByCourseIdAndType(
    courseId: string,
    type: CourseType,
    userId: string,
  ) {
    return await this.courseProgressModel.findOne({
      course: { _id: courseId },
      user: { _id: userId },
      type,
    });
  }

  async findTotalProgressByCourseId(
    courseId: string,
    userId: string,
  ): Promise<TotalCourseProgress> {
    const progresses = await this.courseProgressModel.find({
      course: { _id: courseId },
      user: { _id: userId },
    });

    const quizProgress = progresses.find(
      (progress) => progress.type === CourseType.QUIZ,
    );
    const courseProgress = progresses.find(
      (progress) => progress.type === CourseType.COURSE,
    );
    const quizPageCount = await this.servicePage.countByCourseIdAndType(
      courseId,
      CourseType.QUIZ,
    );
    const coursePageCount = await this.servicePage.countByCourseIdAndType(
      courseId,
      CourseType.COURSE,
    );
    const totalPageCount = quizPageCount + coursePageCount;
    const quizPagePercent = Number(
      ((quizPageCount * 100) / totalPageCount).toFixed(),
    );
    const coursePagePercent = Number(
      ((coursePageCount * 100) / totalPageCount).toFixed(),
    );

    const pass =
      (quizProgress?.pass ?? 0 * quizPagePercent) +
      (courseProgress?.pass ?? 0 * coursePagePercent);
    const fail =
      (quizProgress?.fail ?? 0 * quizPagePercent) +
      (courseProgress?.fail ?? 0 * coursePagePercent);
    const state =
      pass >= 100
        ? CourseProgressState.PASS
        : pass + fail >= 100
        ? CourseProgressState.FAIL
        : CourseProgressState.IN_PROGRESS;

    return {
      pass,
      fail,
      state,
    };
  }
}

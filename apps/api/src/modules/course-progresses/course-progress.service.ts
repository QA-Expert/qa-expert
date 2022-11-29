import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CourseType } from '../courses/course.schema';
import { CourseService } from '../courses/course.service';
import { PageProgressState } from '../page-progresses/page-progress.schema';
import { PageProgressService } from '../page-progresses/page-progress.service';
import { CourseProgress, TotalCourseProgress } from './course-progress.schema';
import { CourseProgressInput } from './create-course-progress.input';
import { getPercent, getState } from './utils';

@Injectable()
export class CourseProgressService {
  constructor(
    @InjectModel(CourseProgress.name)
    private courseProgressModel: Model<CourseProgress>,
    private readonly servicePageProgress: PageProgressService,
    private readonly serviceCourse: CourseService,
  ) {}

  async upsert(
    data: CourseProgressInput,
    userId: string,
  ): Promise<CourseProgress> {
    const pagesProgresses =
      await this.servicePageProgress.findAllByCourseIdAndType(
        data.course,
        data.type,
        userId,
      );
    const courseDb = await this.serviceCourse.findById(data.course);

    if (!courseDb) {
      throw new NotFoundException('Failed to find course');
    }

    const total = courseDb.pages.filter(
      (page) => page.type === data.type,
    ).length;
    const numberOfFailed = pagesProgresses?.filter(
      (process) => process.state === PageProgressState.FAIL,
    ).length;
    const numberOfPassed = pagesProgresses?.filter(
      (process) => process.state === PageProgressState.PASS,
    ).length;

    const fail = getPercent(total, numberOfFailed);
    const pass = getPercent(total, numberOfPassed);
    const state = getState(pass, fail);

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
        type: data.type,
      },
      {
        ...newProgress,
        $push: {
          pageProgresses: new mongoose.Types.ObjectId(data.pageProgress),
        },
      },
      { upsert: true, new: true },
    );
  }

  async findTotalProgressByCourseId(
    courseId: string,
    userId: string,
  ): Promise<TotalCourseProgress> {
    const progresses = await this.courseProgressModel
      .find({
        course: { _id: courseId },
        user: { _id: userId },
      })
      .sort({ updatedAt: 'asc' });

    const updatedAt = progresses[0] ? progresses[0].updatedAt : new Date();

    const quizProgress = progresses.find(
      (progress) => progress.type === CourseType.QUIZ,
    );
    const courseProgress = progresses.find(
      (progress) => progress.type === CourseType.COURSE,
    );

    const courseDb = await this.serviceCourse.findById(courseId);

    if (!courseDb) {
      throw new NotFoundException('Failed to find course');
    }

    const quizPageCount = courseDb.pages.filter(
      (page) => page.type === CourseType.QUIZ,
    ).length;
    const coursePageCount = courseDb.pages.filter(
      (page) => page.type === CourseType.COURSE,
    ).length;

    const total = quizPageCount + coursePageCount;
    const quizPagePercent = getPercent(total, quizPageCount) / 100;
    const coursePagePercent = getPercent(total, coursePageCount) / 100;

    const pagesLeftBeforeFinish =
      total -
      ((quizProgress?.pageProgresses?.length ?? 0) +
        (courseProgress?.pageProgresses?.length ?? 0));
    const pass =
      (quizProgress?.pass ?? 0) * quizPagePercent +
      (courseProgress?.pass ?? 0) * coursePagePercent;
    const fail =
      (quizProgress?.fail ?? 0) * quizPagePercent +
      (courseProgress?.fail ?? 0) * coursePagePercent;
    const state = getState(pass, fail);

    return {
      pagesLeftBeforeFinish,
      pass,
      fail,
      state,
      updatedAt,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Answer } from '../answers/answer.schema';
import { BadgeService } from '../badge/badge.service';
import { PageProgressState } from '../page-progresses/page-progress.schema';
import { PageProgressService } from '../page-progresses/page-progress.service';
import { Page } from '../pages/page.schema';
import { Question } from '../questions/question.schema';
import { User } from '../users/user.schema';
import {
  Course,
  CourseProgress,
  CourseProgressState,
  CourseType,
} from './course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    private readonly servicePageProgress: PageProgressService,
    private readonly serviceBadge: BadgeService,
  ) {}

  async findById(id: string) {
    return await this.courseModel
      .findById(id)
      .populate({
        path: 'pages',
        model: Page.name,
        populate: {
          path: 'question',
          model: Question.name,
          populate: {
            path: 'options answers',
            model: Answer.name,
          },
        },
      })
      .exec();
  }

  async findAll() {
    return await this.courseModel
      .find()
      .populate({
        path: 'pages',
        model: Page.name,
      })
      .exec();
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

  // TODO: should we have db entity for course progress instead of calculating it on fly?
  async findProgress(
    course: Course,
    user: User,
    type?: CourseType,
  ): Promise<CourseProgress> {
    const initValue = {
      pass: 0,
      fail: 0,
      state: CourseProgressState.IN_PROGRESS,
      submittedAt: new Date(),
    };

    if (!course?.pages.length) {
      return initValue;
    }

    const progressesDb = await this.servicePageProgress.findAllByCourseIdAsc(
      course._id,
      user._id,
    );

    if (!progressesDb?.length) {
      return initValue;
    }

    const progresses = progressesDb.filter((progress) =>
      type ? progress.type === type : true,
    );
    const submittedAt = progresses[0].createdAt; // The very last submitted page progress
    const total = course.pages.length ?? 0;
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

    return {
      pass,
      fail,
      state,
      submittedAt,
    };
  }

  async findBadge(course: Course) {
    return await this.serviceBadge.findOnByCourseId(course._id);
  }
}

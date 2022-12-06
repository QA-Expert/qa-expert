import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CourseProgressService } from '../course-progresses/course-progress.service';
import { CourseType } from '../courses/course.schema';
import { SubmittedProgressService } from '../submitted-progresses/submitted-progress.service';
import { CoursePageProgressInput } from './create-course-page-progress.input';
import { QuizPageProgressInput } from './create-quiz-page-progress.input';
import { PageProgress, PageProgressState } from './page-progress.schema';

@Injectable()
export class PageProgressService {
  constructor(
    @InjectModel(PageProgress.name)
    private pageProgressModel: Model<PageProgress>,
    @Inject(forwardRef(() => CourseProgressService))
    private readonly serviceCourseProgress: CourseProgressService,
    private readonly serviceSubmittedProgress: SubmittedProgressService,
  ) {}

  async findAllByCourseIdAndType(
    courseId: string,
    type: CourseType,
    userId: string,
  ) {
    return await this.pageProgressModel.find({
      course: { _id: courseId },
      user: userId,
      type,
    });
  }

  async findOne(pageId: string, userId: string) {
    return await this.pageProgressModel
      .findOne({
        user: {
          _id: userId,
        },
        page: {
          _id: pageId,
        },
      })
      .exec();
  }

  async createCoursePageProgress(
    data: CoursePageProgressInput,
    userId: string,
  ) {
    const newProgress: Partial<PageProgress> = {
      type: CourseType.COURSE,
      state: PageProgressState.PASS,
      page: new mongoose.Types.ObjectId(data.page),
      course: new mongoose.Types.ObjectId(data.course),
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.pageProgressModel(newProgress);

    if (!model) {
      throw new Error('Failed to create new course page progress');
    }

    const createdPageProgress = await model.save();

    await this.serviceCourseProgress.upsert(
      {
        course: data.course,
        type: CourseType.COURSE,
        pageProgress: createdPageProgress._id,
      },
      userId,
    );

    await this.serviceSubmittedProgress.create(data.course, userId);

    return createdPageProgress;
  }

  async createQuizPageProgress(data: QuizPageProgressInput, userId: string) {
    const newProgress: Partial<PageProgress> = {
      ...data,
      answers: data.answers?.map(
        (answer) => new mongoose.Types.ObjectId(answer),
      ),
      type: CourseType.QUIZ,
      page: new mongoose.Types.ObjectId(data.page),
      course: new mongoose.Types.ObjectId(data.course),
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.pageProgressModel(newProgress);

    if (!model) {
      throw new Error('Failed to create new course page progress');
    }

    const createdPageProgress = await model.save();

    await this.serviceCourseProgress.upsert(
      {
        course: data.course,
        type: CourseType.QUIZ,
        pageProgress: createdPageProgress._id,
      },
      userId,
    );

    await this.serviceSubmittedProgress.create(data.course, userId);

    return createdPageProgress;
  }

  async removeMany(pageIds: string[], userId: string) {
    const result = await this.pageProgressModel.deleteMany({
      page: { $in: pageIds },
      user: userId,
    });

    if (result.deletedCount !== pageIds.length) {
      throw new Error('Failed to delete all pages progresses');
    }

    return true;
  }

  async removePageProgressMany(pageProgressIds: string[], userId: string) {
    const result = await this.pageProgressModel.deleteMany({
      _id: { $in: pageProgressIds },
      user: userId,
    });

    if (result.deletedCount !== pageProgressIds.length) {
      throw new Error('Failed to delete all pages progresses');
    }

    return true;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CourseType } from '../courses/course.schema';
import { CoursePageProgressInput } from './create-course-page-progress.input';
import { QuizPageProgressInput } from './create-quiz-page-progress.input';
import { PageProgress, PageProgressState } from './page-progress.schema';

@Injectable()
export class PageProgressService {
  constructor(
    @InjectModel(PageProgress.name)
    private pageProgressModel: Model<PageProgress>,
  ) {}

  async findAll(pages: string[], userId: string) {
    return await this.pageProgressModel.find({
      page: { _id: { $in: pages } },
      user: { _id: userId },
    });
  }

  async findOne(pageId: string, userId: string) {
    const result = await this.pageProgressModel
      .findOne({
        user: {
          _id: userId,
        },
        page: {
          _id: pageId,
        },
      })
      .exec();

    return result;
  }

  async createCoursePageProgress(
    data: CoursePageProgressInput,
    userId: string,
  ) {
    const newProgress: Partial<PageProgress> = {
      type: CourseType.COURSE,
      state: PageProgressState.PASS,
      page: new mongoose.Types.ObjectId(data.page),
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.pageProgressModel(newProgress);

    if (!model) {
      throw new Error('Failed to create new course page progress');
    }

    return model.save();
  }

  async createQuizPageProgress(data: QuizPageProgressInput, userId: string) {
    const newProgress: Partial<PageProgress> = {
      ...data,
      answers: data.answers?.map(
        (answer) => new mongoose.Types.ObjectId(answer),
      ),
      type: CourseType.QUIZ,
      page: new mongoose.Types.ObjectId(data.page),
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.pageProgressModel(newProgress);

    if (!model) {
      throw new Error('Failed to create new course page progress');
    }

    return model.save();
  }
}

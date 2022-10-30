import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CourseType } from '../courses/course.schema';
import { NewCoursePageInput } from './create-course-page.input';
import { QuizPageInput } from './create-quiz-page.input';
import { Page } from './page.schema';
import { CoursePageContentInput } from './update-course-page-content.input';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name)
    private pageModel: Model<Page>,
  ) {}

  async createQuizPage(data: QuizPageInput, userId: string) {
    const newPage: Partial<Page> = {
      ...data,
      type: CourseType.QUIZ,
      question: new mongoose.Types.ObjectId(data.question),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.pageModel(newPage);

    if (!model) {
      throw new Error('Failed to create new quiz page');
    }

    return model.save();
  }

  async createCoursePage(data: NewCoursePageInput, userId: string) {
    const newPage: Partial<Page> = {
      ...data,
      type: CourseType.COURSE,
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.pageModel(newPage);

    if (!model) {
      throw new Error('Failed to create new course page');
    }

    return model.save();
  }

  async update(_id: string, data: CoursePageContentInput, userId: string) {
    const model = this.pageModel
      .findByIdAndUpdate(
        _id,
        {
          content: data.content,
          updatedBy: new mongoose.Types.ObjectId(userId),
        },
        { new: true },
      )
      .exec();

    if (!model) {
      throw new Error('Failed to update course page content');
    }

    return model;
  }
}

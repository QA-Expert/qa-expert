import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Answer } from '../answers/answer.schema';
import { BadgeService } from '../badges/badge.service';
import { Page } from '../pages/page.schema';
import { Question } from '../questions/question.schema';
import { Course } from './course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    private readonly serviceBadge: BadgeService,
  ) {}

  async findById(id: string) {
    return await this.courseModel
      .findById(id)
      .populate({
        path: 'recommendedCourses',
        model: Course.name,
      })
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

  async findByIdPublic(id: string) {
    return await this.courseModel.findById(id).exec();
  }

  async findAll() {
    return await this.courseModel
      .find()
      .populate({
        path: 'pages',
        model: Page.name,
      })
      .populate({
        path: 'recommendedCourses',
        model: Course.name,
      })
      .sort([['level', 'asc']])
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

  async findBadge(course: Course) {
    return await this.serviceBadge.findOneByCourseId(course._id);
  }
}

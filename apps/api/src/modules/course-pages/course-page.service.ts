import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CoursePage } from './course-page.schema';
import { CoursePageInput } from './create-course-page.input';
import { CoursePageContentInput } from './update-course-page-content.input';

@Injectable()
export class CoursePageService {
  constructor(
    @InjectModel(CoursePage.name)
    private coursePageModel: Model<CoursePage>,
  ) {}

  async update(_id: string, data: CoursePageContentInput, userId: string) {
    const model = this.coursePageModel
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
      throw new Error('Failed to update course page');
    }

    return model;
  }

  async create(data: CoursePageInput, userId: string) {
    const newPage: Partial<CoursePage> = {
      ...data,
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.coursePageModel(newPage);

    if (!model) {
      throw new Error('Failed to create new course page');
    }

    return model.save();
  }
}

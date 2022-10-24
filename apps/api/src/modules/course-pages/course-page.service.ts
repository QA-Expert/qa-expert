import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoursePage } from './course-page.schema';
import { CoursePageContentInput } from './create-course-page-content.input';

@Injectable()
export class CoursePageService {
  constructor(
    @InjectModel(CoursePage.name)
    private coursePageModel: Model<CoursePage>,
  ) {}

  async update(_id: string, data: CoursePageContentInput) {
    const model = this.coursePageModel
      .findByIdAndUpdate(
        _id,
        {
          content: data.content,
        },
        { new: true },
      )
      .exec();

    if (!model) {
      throw new Error('Failed to update course page');
    }

    return model;
  }
}

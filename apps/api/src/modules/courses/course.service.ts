import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoursePage } from '../course-pages/course-page.schema';
import { Course } from './course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
  ) {}

  async findById(id: string) {
    return await this.courseModel
      .findById(id)
      .populate({
        path: 'coursePages',
        model: CoursePage.name,
      })
      .exec();
  }

  async findAll() {
    return await this.courseModel.find().exec();
  }
}

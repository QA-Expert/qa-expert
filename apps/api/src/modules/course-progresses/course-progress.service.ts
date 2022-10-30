import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CourseProgress } from './course-progress.schema';
import { CourseProgressInput } from './create-course-progress.input';

@Injectable()
export class CourseProgressService {
  constructor(
    @InjectModel(CourseProgress.name)
    private courseProgressModel: Model<CourseProgress>,
  ) {}

  async findAll(userId: string, courseId: string) {
    return await this.courseProgressModel.find({
      user: {
        _id: userId,
      },
      course: {
        _id: courseId,
      },
    });
  }

  async findOne(courseId: string, coursePageId: string, userId: string) {
    const result = await this.courseProgressModel
      .findOne({
        user: {
          _id: userId,
        },
        course: {
          _id: courseId,
        },
        coursePage: {
          _id: coursePageId,
        },
      })
      .exec();

    return result;
  }

  async create(data: CourseProgressInput, userId: string) {
    const newCourseProgress: Partial<CourseProgress> = {
      course: new mongoose.Types.ObjectId(data.course),
      coursePage: new mongoose.Types.ObjectId(data.coursePage),
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.courseProgressModel(newCourseProgress);

    if (!model) {
      throw new Error('Failed to create new course progress');
    }

    return model.save();
  }
}

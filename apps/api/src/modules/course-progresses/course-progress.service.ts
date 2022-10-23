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

  async create(data: CourseProgressInput, userId: string) {
    const newCourseProgress = {
      ...data,
      user: new mongoose.Schema.Types.ObjectId(userId),
    };

    const model = new CourseProgress(newCourseProgress);

    if (!model) {
      throw new Error('Failed to create new course progress');
    }

    return model.save();
  }
}

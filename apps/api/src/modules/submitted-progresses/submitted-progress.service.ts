import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CourseProgressService } from '../course-progresses/course-progress.service';
import { SubmittedProgress } from './submitted-progress.schema';

@Injectable()
export class SubmittedProgressService {
  constructor(
    @InjectModel(SubmittedProgress.name)
    private submittedProgressModel: Model<SubmittedProgress>,
    private readonly serviceCourseProgress: CourseProgressService,
  ) {}

  async findAll(userId: string) {
    return this.submittedProgressModel
      .find({
        user: {
          _id: userId,
        },
      })
      .populate('course.title')
      .exec();
  }

  async create(courseId: string, userId: string) {
    const totalCourseProgress =
      await this.serviceCourseProgress.findTotalProgressByCourseId(
        courseId,
        userId,
      );

    const newProgress: Partial<SubmittedProgress> = {
      progress: totalCourseProgress.pass,
      course: new mongoose.Types.ObjectId(courseId),
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.submittedProgressModel(newProgress);

    if (!model) {
      throw new Error('Failed to create new submitted progress');
    }

    return await model.save();
  }
}

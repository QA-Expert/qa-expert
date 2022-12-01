import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CourseProgressState } from '../course-progresses/course-progress.schema';
import { CourseProgressService } from '../course-progresses/course-progress.service';
import { CourseType } from '../courses/course.schema';
import { SubmittedProgress } from './submitted-progress.schema';

@Injectable()
export class SubmittedProgressService {
  constructor(
    @InjectModel(SubmittedProgress.name)
    private submittedProgressModel: Model<SubmittedProgress>,
    @Inject(forwardRef(() => CourseProgressService))
    private readonly serviceCourseProgress: CourseProgressService,
  ) {}

  async findAll(userId: string) {
    return await this.submittedProgressModel
      .find({
        user: {
          _id: userId,
        },
      })
      .populate({ path: 'course', select: 'title' })
      .exec();
  }

  async create(courseId: string, userId: string) {
    const totalCourseProgress =
      await this.serviceCourseProgress.findTotalProgressByCourseId(
        courseId,
        userId,
      );

    if (totalCourseProgress.state === CourseProgressState.IN_PROGRESS) {
      return null;
    }

    const quizProgress =
      await this.serviceCourseProgress.findOneByCourseIdAndType(
        courseId,
        userId,
        CourseType.QUIZ,
      );
    const courseProgress =
      await this.serviceCourseProgress.findOneByCourseIdAndType(
        courseId,
        userId,
        CourseType.COURSE,
      );

    const newProgress: Partial<SubmittedProgress> = {
      totalProgress: totalCourseProgress.pass,
      courseProgress: courseProgress?.pass ?? 0,
      quizProgress: quizProgress?.pass ?? 0,
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

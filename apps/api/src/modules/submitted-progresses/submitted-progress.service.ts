import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { SubmittedProgress } from './submitted-progress.schema';

@Injectable()
export class SubmittedProgressService {
  constructor(
    @InjectModel(SubmittedProgress.name)
    private submittedProgressModel: Model<SubmittedProgress>,
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

  async create(courseId: string, userId: string, pass: number) {
    const newProgress: Partial<SubmittedProgress> = {
      progress: pass,
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

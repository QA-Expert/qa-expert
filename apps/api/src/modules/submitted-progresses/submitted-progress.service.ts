import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Course } from '../courses/course.schema';
import { SubmittedProgressInput } from './create-submitted-progress.input';
import { SubmittedProgress } from './submitted-progress.schema';

@Injectable()
export class SubmittedProgressService {
  constructor(
    @InjectModel(SubmittedProgress.name)
    private submittedProgressModel: Model<SubmittedProgress>,
  ) {}

  async findAll(userId: string) {
    return this.submittedProgressModel.find({
      user: {
        _id: userId,
      },
    });
  }

  async create(data: SubmittedProgressInput, userId: string) {
    const newProgress: Partial<SubmittedProgress> = {
      ...data,
      course: new mongoose.Types.ObjectId(data.course),
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.submittedProgressModel(newProgress);

    if (!model) {
      throw new Error('Failed to create new submitted progress');
    }

    return model.save();
  }
}

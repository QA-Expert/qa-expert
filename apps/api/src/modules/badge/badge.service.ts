import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Answer } from '../answers/answer.schema';
import { Course } from '../courses/course.schema';
import { Question } from '../questions/question.schema';
import { Badge } from './badge.schema';
import { BadgeInputCreate } from './create-badge.input';

@Injectable()
export class BadgeService {
  constructor(
    @InjectModel(Badge.name)
    private badgeModel: Model<Badge>,
  ) {}

  async findAll(userId: string) {
    return await this.badgeModel
      .find({ user: { _id: userId } })
      .populate({ path: Course.name })
      .exec();
  }

  async addBadge(data: BadgeInputCreate, userId: string) {
    const newBadge: Partial<Badge> = {
      ...data,
      course: new mongoose.Types.ObjectId(data.course),
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.badgeModel(newBadge);

    if (!model) {
      throw new Error('Failed to create new badge');
    }

    return model.save();
  }
}

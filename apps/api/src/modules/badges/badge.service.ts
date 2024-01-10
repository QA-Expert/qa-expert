import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Badge } from './badge.schema';

@Injectable()
export class BadgeService {
  constructor(
    @InjectModel(Badge.name)
    private badgeModel: Model<Badge>,
  ) {}

  async findAll() {
    return await this.badgeModel.find().populate('course').exec();
  }

  async findOneByCourseId(courseId: string) {
    return await this.badgeModel.findOne({ course: { _id: courseId } });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UnlockedBadge } from './unlocked-badge.schema';

@Injectable()
export class UnlockedBadgeService {
  constructor(
    @InjectModel(UnlockedBadge.name)
    private model: Model<UnlockedBadge>,
  ) {}

  async findAll(userId: string) {
    return await this.model
      .find({
        user: {
          _id: userId,
        },
      })
      .exec();
  }

  async add(badgeId: string, userId: string) {
    const newUnlockedBadge: Partial<UnlockedBadge> = {
      user: new mongoose.Types.ObjectId(userId),
      badge: new mongoose.Types.ObjectId(badgeId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.model(newUnlockedBadge);

    if (!model) {
      throw new Error('Failed to create new unlocked Badge');
    }

    return await model.save();
  }
}

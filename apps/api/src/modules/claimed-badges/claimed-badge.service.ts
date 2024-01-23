import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ClaimedBadge } from './claimed-badge.schema';

@Injectable()
export class ClaimedBadgeService {
  constructor(
    @InjectModel(ClaimedBadge.name)
    private model: Model<ClaimedBadge>,
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
    const newClaimedBadge: Partial<ClaimedBadge> = {
      user: new mongoose.Types.ObjectId(userId),
      badge: new mongoose.Types.ObjectId(badgeId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.model(newClaimedBadge);

    if (!model) {
      throw new Error('Failed to create new unlocked Badge');
    }

    return await model.save();
  }
}

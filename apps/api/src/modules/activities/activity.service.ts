import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from './activity.schema';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private activityModel: Model<Activity>,
  ) {}

  async findAll(userId: string) {
    return await this.activityModel
      .find({
        user: {
          _id: userId,
        },
      })
      .exec();
  }
}

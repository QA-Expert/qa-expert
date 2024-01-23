import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CourseLike } from './course-likes.schema';

@Injectable()
export class CourseLikeService {
  constructor(
    @InjectModel(CourseLike.name)
    private model: Model<CourseLike>,
  ) {}

  async getNumberOfLikeByCourseId(courseId: string) {
    return await this.model
      .countDocuments({
        course: {
          _id: courseId,
        },
      })
      .exec();
  }

  async isCourseLikedByUser(courseId: string, userId: string) {
    const count = await this.model
      .countDocuments({
        course: {
          _id: courseId,
        },
        user: {
          _id: userId,
        },
      })
      .exec();

    return Boolean(count);
  }

  async add(courseId: string, userId: string) {
    const newCourseLike: Partial<CourseLike> = {
      user: new mongoose.Types.ObjectId(userId),
      course: new mongoose.Types.ObjectId(courseId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.model(newCourseLike);

    if (!model) {
      throw new Error('Failed to add new course like');
    }

    return await model.save();
  }
}

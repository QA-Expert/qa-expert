import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { QuizProgressInput } from './create-quiz-progress.input';
import { QuizProgress } from './quiz-progress.schema';

@Injectable()
export class QuizProgressService {
  constructor(
    @InjectModel(QuizProgress.name)
    private quizProgressModel: Model<QuizProgress>,
  ) {}

  async findAll(quizId: string, userId: string) {
    return await this.quizProgressModel
      .find({
        user: {
          id: userId,
        },
        quiz: {
          id: quizId,
        },
      })
      .exec();
  }

  async create(data: QuizProgressInput, userId: string) {
    const newQuizProgress = {
      ...data,
      user: new mongoose.Schema.Types.ObjectId(userId),
    };

    const model = new this.quizProgressModel(newQuizProgress);

    if (!model) {
      throw new Error('Failed to create new quiz progress');
    }

    return await model.save();
  }
}

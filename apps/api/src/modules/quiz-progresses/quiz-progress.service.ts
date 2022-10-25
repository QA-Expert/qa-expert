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

  async findOne(quizId: string, quizPageId: string, userId: string) {
    const result = await this.quizProgressModel
      .findOne({
        user: {
          _id: userId,
        },
        quiz: {
          _id: quizId,
        },
        quizPage: {
          _id: quizPageId,
        },
      })
      .exec();

    return result;
  }

  async create(data: QuizProgressInput, userId: string) {
    const newQuizProgress = {
      ...data,
      quiz: new mongoose.Types.ObjectId(data.quiz),
      quizPage: new mongoose.Types.ObjectId(data.quizPage),
      user: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.quizProgressModel(newQuizProgress);

    if (!model) {
      throw new Error('Failed to create new quiz progress');
    }

    return await model.save();
  }
}

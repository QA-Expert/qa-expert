import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from '../answers/answer.schema';
import { Question } from '../questions/question.schema';
import { QuizPage } from '../quiz-pages/quiz-page.schema';
import { Quiz } from './quiz.schema';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) {}

  async findById(id: string) {
    return await this.quizModel
      .findById(id)
      .populate({
        path: 'quizPages',
        model: QuizPage.name,
        populate: {
          path: 'question',
          model: Question.name,
          populate: {
            path: 'options answers',
            model: Answer.name,
          },
        },
      })
      .exec();
  }

  async findAll() {
    return await this.quizModel.find().exec();
  }
}

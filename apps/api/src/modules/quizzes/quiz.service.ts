import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from '../answers/answer.schema';
import { Question } from '../questions/question.schema';
import { QuizPage } from '../quiz-pages/quiz-page.schema';
import { QuizPageProgressState } from '../quiz-progresses/quiz-progress.schema';
import { QuizProgressService } from '../quiz-progresses/quiz-progress.service';
import { User } from '../users/user.schema';
import { Quiz } from './quiz.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
    private readonly serviceQuizProgress: QuizProgressService,
  ) {}

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

  async findProgress(quiz: Quiz, user: User) {
    const initValue = {
      pass: 0,
      fail: 0,
    };

    if (!quiz?.quizPages.length) {
      return initValue;
    }

    const progresses = await this.serviceQuizProgress.findAll(
      quiz._id,
      user._id,
    );

    if (!progresses?.length) {
      return initValue;
    }

    const numberOfFailed = progresses?.filter(
      (process) => process.state === QuizPageProgressState.FAIL,
    ).length;
    const numberOfPassed = progresses?.filter(
      (process) => process.state === QuizPageProgressState.PASS,
    ).length;
    const total = quiz?.quizPages.length ?? 0;

    const fail = Number(((numberOfFailed * 100) / total).toFixed());
    const pass = Number(((numberOfPassed * 100) / total).toFixed());

    return {
      pass,
      fail,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './quiz.schema';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) {}

  async findById(id: string) {
    return await this.quizModel.findById(id).exec();
  }

  async findAll() {
    return await this.quizModel.find().exec();
  }
}

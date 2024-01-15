import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from './answer.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name)
    private model: Model<Answer>,
  ) {}

  async findById(id: string) {
    return await this.model.findById(id).exec();
  }
}

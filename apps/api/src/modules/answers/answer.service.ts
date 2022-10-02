import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { AnswerInput } from './create-answer.input';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly repository: Repository<Answer>,
  ) {}

  async findOn(userId: string, quizPageId: string) {
    return await this.repository.findOne({
      where: {
        userId,
        quizPageId,
      },
    });
  }

  async create(data: AnswerInput) {
    const response = await this.repository.save(this.repository.create(data));

    return response;
  }
}

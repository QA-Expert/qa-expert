import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizProgressInput } from './create-quiz-progress.input';
import { QuizProgress } from './quiz-progress.entity';

@Injectable()
export class QuizProgressService {
  constructor(
    @InjectRepository(QuizProgress)
    private readonly repository: Repository<QuizProgress>,
  ) {}

  async findAll(quizId: string, userId: string) {
    return await this.repository.find({
      where: {
        userId,
        quizId,
      },
    });
  }

  async create(data: QuizProgressInput, userId: string) {
    data.userId = userId;

    const response = await this.repository.save(this.repository.create(data));

    return response;
  }
}

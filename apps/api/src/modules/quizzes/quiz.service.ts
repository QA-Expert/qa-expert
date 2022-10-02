import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly repository: Repository<Quiz>,
  ) {}

  async findById(id: string) {
    return await this.repository.findOne({
      where: { id },
      relations: {
        quizPages: true,
        courses: {
          title: true,
        },
      },
    });
  }

  async findAll() {
    return await this.repository.find();
  }
}

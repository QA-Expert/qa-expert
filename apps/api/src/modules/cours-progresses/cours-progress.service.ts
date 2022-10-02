import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursProgress } from './cours-progress.entity';
import { CoursProgressInput } from './create-cours-progress.input';

@Injectable()
export class CoursProgressService {
  constructor(
    @InjectRepository(CoursProgress)
    private readonly repository: Repository<CoursProgress>,
  ) {}

  async findAll(userId: string, coursId: string) {
    return await this.repository.find({
      where: {
        userId,
        coursId,
      },
    });
  }

  async create(data: CoursProgressInput) {
    const response = await this.repository.save(this.repository.create(data));

    return response;
  }
}

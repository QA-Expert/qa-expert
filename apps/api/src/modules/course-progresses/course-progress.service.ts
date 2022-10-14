import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseProgress } from './course-progress.entity';
import { CourseProgressInput } from './create-course-progress.input';

@Injectable()
export class CourseProgressService {
  constructor(
    @InjectRepository(CourseProgress)
    private readonly repository: Repository<CourseProgress>,
  ) {}

  async findAll(userId: string, courseId: string) {
    return await this.repository.find({
      where: {
        userId,
        courseId,
      },
    });
  }

  async create(data: CourseProgressInput) {
    const response = await this.repository.save(this.repository.create(data));

    return response;
  }
}

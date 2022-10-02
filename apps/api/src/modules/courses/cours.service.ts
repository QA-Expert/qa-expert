import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cours } from './cours.entity';

@Injectable()
export class CoursService {
  constructor(
    @InjectRepository(Cours)
    private readonly repository: Repository<Cours>,
  ) {}

  async findById(id: string) {
    return await this.repository.findOneBy({ id });
  }

  async findAll() {
    return await this.repository.find();
  }
}

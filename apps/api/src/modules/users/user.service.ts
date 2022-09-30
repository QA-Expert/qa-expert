import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserInput } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(data: UserInput) {
    const user = await this.userRepository.save(
      this.userRepository.create(data),
    );

    return user;
  }
}

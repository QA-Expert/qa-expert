import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

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
    //TODO has passwrod
    const newUser: DeepPartial<User> = {
      hashedPassword: data.password,
      ...data,
    };

    const user = await this.userRepository.save(
      this.userRepository.create(newUser),
    );

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserInputCreate } from './create-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async create(data: UserInputCreate) {
    //TODO has passwrod
    const newUser: DeepPartial<User> = {
      hashedPassword: data.password,
      ...data,
    };

    const response = await this.userRepository.save(
      this.userRepository.create(newUser),
    );

    return response;
  }
}

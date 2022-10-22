import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInputCreate } from './create-user.input';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(data: UserInputCreate) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const newUser = {
      ...data,
      hashedPassword,
    };
    const createdUser = new this.userModel(newUser);

    if (!createdUser) {
      throw new Error('Failed to create new user');
    }

    return await createdUser.save();
  }
}

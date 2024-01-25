import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserSocialProvider } from './user-social-provider.schema';
import { UserSocialProviderCreateInput } from './user-social-provider-create.input';
import { UserSocialProviderLoginInput } from './user-social-provider-login.input';
import { UserService } from '../users/user.service';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Injectable()
export class UserSocialProviderService {
  constructor(
    @InjectModel(UserSocialProvider.name)
    private model: Model<UserSocialProvider>,
    private usersService: UserService,
  ) {}

  async findOnByProviderAndSocialId({
    id,
    socialId,
  }: UserSocialProviderLoginInput) {
    const doc = await this.model
      .findOne({
        id,
        socialId,
      })
      .exec();

    if (!doc) {
      throw new NotFoundException();
    }

    return doc;
  }

  async create(data: UserSocialProviderCreateInput) {
    const doc = await this.model.findOne({
      id: data.id,
      socialId: data.socialId,
    });

    if (doc) {
      throw new Error('User social login already exists');
    }

    const user = await this.usersService.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: randomStringGenerator(),
    });

    const newDoc: Partial<UserSocialProvider> = {
      id: data.id,
      socialId: data.socialId,
      type: data.type,
      user: new mongoose.Types.ObjectId(user._id),
      createdBy: new mongoose.Types.ObjectId(user._id),
      updatedBy: new mongoose.Types.ObjectId(user._id),
    };

    const model = new this.model(newDoc);

    if (!model) {
      throw new Error('Failed to create new use social login');
    }

    return await model.save();
  }
}

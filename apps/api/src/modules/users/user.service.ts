import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInputCreate } from './create-user.input';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { createTransport, SendMailOptions } from 'nodemailer';
import { randomBytes } from 'crypto';
import { readFile } from 'fs/promises';
import { ForgotPassword } from './forgot-password.schema';
import { ResetPasswordInput } from './reset-password.input';
import { UserInputUpdateNames } from './update-user-names.input';
import { UserInputUpdatePassword } from './update-user-password.input';
import { ApiConfigService } from '../config/config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(ForgotPassword.name)
    private forgotPasswordModel: Model<ForgotPassword>,
    private apiConfigService: ApiConfigService,
  ) {}

  async findById(id: string | mongoose.Types.ObjectId) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(data: UserInputCreate) {
    const user = await this.findByEmail(data.email);

    if (user) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      this.apiConfigService.authSalt,
    );
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

  async forgotPassword(email: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new Error('Failed to find user');
    }

    const token = randomBytes(32).toString('hex');

    const transporter = createTransport({
      host: this.apiConfigService.emailServiceUrl,
      port: 587,
      auth: {
        user: this.apiConfigService.emailServiceUsername,
        pass: this.apiConfigService.emailServicePassword,
      },
    });

    const buffer = await readFile(
      'src/modules/users/forgot-password-email-template.html',
    );
    const template = buffer
      .toString()
      .replace(/{{name}}/g, user.firstName ?? user.email)
      .replace(/{{product-name}}/g, process.env.APP_NAME ?? '')
      .replace(/{{host}}/g, process.env.HOST ?? '')
      .replace(
        /{{action_url}}/g,
        `${process.env.HOST}:${process.env.PORT ?? 80}/reset-password/${token}`,
      );

    const mailOptions: SendMailOptions = {
      from: this.apiConfigService.emailServiceUsername,
      to: email,
      subject: `[no-reply] Forgot Password - ${process.env.APP_NAME}`,
      html: template,
    };

    const response = await transporter.sendMail(mailOptions);

    if (!response.messageId) {
      throw new Error('Failed to sent email');
    }

    const forgotPassword = new this.forgotPasswordModel({
      user: new mongoose.Types.ObjectId(user._id),
      token,
      createdBy: new mongoose.Types.ObjectId(user._id),
      updatedBy: new mongoose.Types.ObjectId(user._id),
    });

    if (!forgotPassword) {
      throw new Error('Failed to create forgot password token');
    }

    await forgotPassword.save();

    return true;
  }

  async resetPassword(data: ResetPasswordInput): Promise<User> {
    const storedToken = await this.forgotPasswordModel.findOne({
      token: data.token,
    });

    if (!storedToken) {
      throw new NotFoundException('Failed to find forgot password token');
    }

    const tokenCreatedAt = storedToken.createdAt;
    const nowDate = new Date();
    const hours = Math.abs(nowDate.valueOf() - tokenCreatedAt.valueOf()) / 36e5;

    if (hours > this.apiConfigService.authForgotPasswordTokenExpiresIn) {
      throw new Error('Forgot password token expired');
    }

    const user = await this.findById(storedToken.user._id);

    if (!user) {
      throw new NotFoundException();
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      this.apiConfigService.authSalt,
    );

    user.hashedPassword = hashedPassword;

    const updatedUser = await user.save();

    if (!updatedUser) {
      throw new Error('Failed to reset password');
    }

    await storedToken.remove();

    return updatedUser;
  }

  async updateNames(
    data: UserInputUpdateNames,
    userId: string | mongoose.Types.ObjectId,
  ): Promise<User> {
    const user = await this.findById(userId);

    if (data.firstName) {
      user.firstName = data.firstName;
    }

    if (data.lastName) {
      user.lastName = data.lastName;
    }

    user.updatedBy = new mongoose.Types.ObjectId(userId);

    return await user.save();
  }

  async updatePassword(
    data: UserInputUpdatePassword,
    userId: string | mongoose.Types.ObjectId,
  ): Promise<User> {
    const user = await this.findById(userId);

    const matchNewPassword = await bcrypt.compare(
      data.newPassword,
      user.hashedPassword,
    );

    if (matchNewPassword) {
      throw new Error('Failed to change password');
    }

    const matchOldPassword = await bcrypt.compare(
      data.oldPassword,
      user.hashedPassword,
    );

    if (matchOldPassword) {
      user.hashedPassword = await bcrypt.hash(
        data.newPassword,
        this.apiConfigService.authSalt,
      );
    } else {
      throw new Error('Failed to change password');
    }

    user.updatedBy = new mongoose.Types.ObjectId(userId);

    return await user.save();
  }

  async addBadge(badgeId: string, userId: string) {
    return await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $push: {
            badges: new mongoose.Types.ObjectId(badgeId),
          },
          updatedBy: new mongoose.Types.ObjectId(userId),
        },
        { new: true },
      )
      .exec();
  }
}

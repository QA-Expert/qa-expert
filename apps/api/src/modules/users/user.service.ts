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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(ForgotPassword.name)
    private forgotPasswordModel: Model<ForgotPassword>,
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
      process.env.AUTH_SALT ?? 10,
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
      host: process.env.EMAIL_SERVICE,
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
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
        `${process.env.HOST}/reset-password/${token}`,
      );

    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: `[no-reply] QA School - ${process.env.APP_NAME}`,
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

    return true;
  }

  async resetPassword(data: ResetPasswordInput): Promise<User> {
    const storedToken = await this.forgotPasswordModel.findOne({
      token: data.token,
    });

    if (!storedToken) {
      throw new NotFoundException('Failed to find forgot password token');
    }

    // TODO check that token is expired or not

    const user = await this.findById(storedToken.user._id);

    if (!user) {
      throw new NotFoundException();
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      process.env.AUTH_SALT ?? 10,
    );

    user.hashedPassword = hashedPassword;

    const updatedUser = await user.save();

    if (!updatedUser) {
      throw new Error('Failed to reset password');
    }

    return updatedUser;
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserInputCreate } from './create-user.input';
import * as bcrypt from 'bcrypt';
import { Roles, User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import { ForgotPassword } from './forgot-password.schema';
import { ResetPasswordInput } from './reset-password.input';
import { UserInputUpdateNames } from './update-user-names.input';
import { UserInputUpdatePassword } from './update-user-password.input';
import { ConfigService } from '../config/config.service';
import { EmailService } from '../emails/email.service';
import { EmailData } from '../emails/email-data';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(ForgotPassword.name)
    private forgotPasswordModel: Model<ForgotPassword>,
    private configService: ConfigService,
    private emailService: EmailService,
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
      throw new NotFoundException(
        `User ${email} is not found. Please register.`,
      );
    }

    return user;
  }

  async create(data: UserInputCreate) {
    const user = await this.userModel.findOne({ email: data.email });

    if (user) {
      throw new Error('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      this.configService.authSalt,
    );
    const newUser = {
      ...data,
      roles: [Roles.USER],
      hashedPassword,
    };
    const model = new this.userModel(newUser);

    if (!model) {
      throw new Error('Failed to create new user');
    }

    return await model.save();
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.findByEmail(email);

      const token = randomBytes(32).toString('hex');

      const mailOptions: EmailData = {
        from: 'no-reply@qaexpert.io',
        to: email,
        subject: `[no-reply] Forgot Password - ${this.configService.appName}`,
        text: '',
        html: `<div>
            <p>Please click follow the link to reset your password</p>
            <a href="${this.configService.clientBaseUrl}/reset-password/${token}">Reset Password</a>
          <div/>`,
      };

      await this.emailService.sendEmail(mailOptions);

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
    } catch (error) {
      this.logger.error((error as Error).message, error);

      throw error;
    }
  }

  async resetPassword(data: ResetPasswordInput): Promise<User> {
    try {
      const storedToken = await this.forgotPasswordModel.findOne({
        token: data.token,
      });

      if (!storedToken) {
        throw new NotFoundException('Failed to find forgot password token');
      }

      const tokenCreatedAt = storedToken.createdAt;
      const nowDate = new Date();
      const hours =
        Math.abs(nowDate.valueOf() - tokenCreatedAt.valueOf()) / 36e5;

      if (hours > Number(this.configService.authForgotPasswordTokenExpiresIn)) {
        throw new Error('Forgot password token expired');
      }

      const user = await this.findById(storedToken.user._id);

      user.hashedPassword = await bcrypt.hash(
        data.password,
        this.configService.authSalt,
      );

      const updatedUser = await user.save();

      if (!updatedUser) {
        throw new Error('Failed to reset password');
      }

      await storedToken.remove();

      return updatedUser;
    } catch (error) {
      this.logger.error((error as Error).message, error);

      throw error;
    }
  }

  async updateNames(
    data: UserInputUpdateNames,
    userId: string | mongoose.Types.ObjectId,
  ) {
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
  ) {
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
        this.configService.authSalt,
      );
    } else {
      throw new Error('Failed to change password');
    }

    user.updatedBy = new mongoose.Types.ObjectId(userId);

    return await user.save();
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';
import { UserInputLogin } from '../users/login-user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserOutputLogin } from '../users/login-user.output';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: UserInputLogin): Promise<UserOutputLogin | null> {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(data.password, user.hashedPassword);

    if (match) {
      return await this.login(user);
    }

    return null;
  }

  async login(user: User): Promise<UserOutputLogin> {
    const payload: Pick<User, 'email'> = { email: user.email };
    return {
      email: user.email,
      access_token: this.jwtService.sign(payload, {
        secret: process.env.AUTH_SECRET,
      }),
    };
  }
}

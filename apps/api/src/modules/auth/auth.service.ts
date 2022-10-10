import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
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

  async validateUserAndLogin(
    data: UserInputLogin,
  ): Promise<UserOutputLogin | null> {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException(`User ${data.email} is not found`);
    }

    const match = await bcrypt.compare(data.password, user.hashedPassword);

    if (match) {
      return await this.login(user);
    }

    throw new UnauthorizedException('Incorrect credantials');
  }

  async login(user: UserOutputLogin): Promise<UserOutputLogin> {
    return {
      ...user,
      access_token: this.jwtService.sign(
        { ...user },
        {
          secret: process.env.AUTH_SECRET,
        },
      ),
    };
  }
}

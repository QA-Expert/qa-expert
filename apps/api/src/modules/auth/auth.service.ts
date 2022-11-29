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
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUserAndLogin(
    data: UserInputLogin,
  ): Promise<UserOutputLogin | null> {
    const result = await this.usersService.findByEmail(data.email);

    if (!result) {
      throw new NotFoundException(`User ${data.email} is not found`);
    }

    const match = await bcrypt.compare(data.password, result.hashedPassword);

    if (match) {
      const user = {
        _id: result._id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
      };

      return await this.login(user);
    }

    throw new UnauthorizedException('Incorrect credentials');
  }

  async login(user: UserOutputLogin): Promise<UserOutputLogin> {
    return {
      ...user,
      access_token: this.jwtService.sign(
        { ...user },
        {
          secret: this.configService.authSecret,
        },
      ),
    };
  }
}

import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { getTokenCookie } from 'src/utls/auth-cookie';
import { User } from '../users/user.schema';
import { UserService } from '../users/user.service';
import { getRequest } from './helpers';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = getRequest(context);
      const token = getTokenCookie(req);
      const { _id } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.authSecret,
      });

      // hydrating user for req context
      const userFromDb = await this.userService.findById(_id);
      const user: Pick<
        User,
        '_id' | 'email' | 'firstName' | 'lastName' | 'roles'
      > = {
        _id: userFromDb._id,
        email: userFromDb.email,
        firstName: userFromDb.firstName,
        lastName: userFromDb.lastName,
        roles: userFromDb.roles,
      };

      req.user = user;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }

      throw error;
    }

    return true;
  }
}

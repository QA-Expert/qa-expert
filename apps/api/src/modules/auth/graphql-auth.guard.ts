import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super();
  }

  // Override this method so it can be used in graphql
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;

    if (gqlReq) {
      const { variables } = ctx.getArgs();
      gqlReq.body = variables;

      return gqlReq;
    }

    return context.switchToHttp().getRequest();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    const authHeader = req.headers.authorization as string;

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new BadRequestException(
        `Authentication type \'Bearer\' required. Found \'${type}\'`,
      );
    }

    try {
      const { id } = this.jwtService.verify(token, {
        secret: process.env.AUTH_SECRET,
      });

      // hydrating user for req context
      const userFromDb = await this.userService.findById(id);
      const user: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'> = {
        id: userFromDb.id,
        email: userFromDb.email,
        firstName: userFromDb.firstName,
        lastName: userFromDb.lastName,
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

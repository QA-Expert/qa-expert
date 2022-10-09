import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
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

    const [type] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new BadRequestException(
        `Authentication type \'Bearer\' required. Found \'${type}\'`,
      );
    }

    return true;
  }

  handleRequest<UserInputLogin>(
    err: any,
    user: UserInputLogin,
  ): UserInputLogin {
    console.log('VALIDATE jwt ======> ', user);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

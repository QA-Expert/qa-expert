import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RequestWithUser } from '../auth/helpers';

/**
 * Decorator that is used in graphql queries as parameter.
 * It has current user object that is hydrated using jwt token
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    // user property gets hydrated in jwt-auth.guard.ts when we verify token and get user from db base
    return ctx.getContext<{ req: RequestWithUser }>().req.user;
  },
);

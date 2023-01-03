import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { User } from '../users/user.schema';

export interface RequestWithUser extends Request {
  user: Pick<
    User,
    '_id' | 'email' | 'firstName' | 'lastName' | 'roles' | 'badges'
  >;
}

// Override this method so it can be used in graphql
export const getRequest = (context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const gqlReq = ctx.getContext<{ req: RequestWithUser }>().req;

  if (gqlReq) {
    const { variables } = ctx.getArgs();
    gqlReq.body = variables;

    return gqlReq;
  }

  return context.switchToHttp().getRequest<RequestWithUser>();
};

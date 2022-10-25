import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Override this method so it can be used in graphql
export const getRequest = (context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const gqlReq = ctx.getContext().req;

  if (gqlReq) {
    const { variables } = ctx.getArgs();
    gqlReq.body = variables;

    return gqlReq;
  }

  return context.switchToHttp().getRequest();
};

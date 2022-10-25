import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../users/user.schema';
import { getRequest } from './helpers';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = getRequest(context);
    const { user } = req;
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const isPermitter = requiredRoles.some((role) => user.roles.includes(role));

    if (!isPermitter) {
      throw new ForbiddenException(
        'User is not permitter to perform operation',
      );
    }

    return true;
  }
}

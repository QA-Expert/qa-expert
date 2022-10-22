import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from './user.decorator';
import { UserInputCreate } from './create-user.input';
import { UserInputLogin } from './login-user.input';
import { UserOutputLogin } from './login-user.output';
import { UserService } from './user.service';
import { ServerResponse } from 'http';
import { setTokenCookie, removeTokenCookie } from 'src/utls/auth-cookie';
import { User } from './user.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  public async user(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => UserOutputLogin)
  public async login(
    @Args('data') data: UserInputLogin,
    @Context() context: { res: ServerResponse },
  ): Promise<UserOutputLogin | null> {
    const result = await this.authService.validateUserAndLogin(data);

    setTokenCookie(context.res, result?.access_token ?? '');

    return result;
  }

  @Mutation(() => UserOutputLogin)
  public async register(
    @Args('data') data: UserInputCreate,
    @Context() context: { res: ServerResponse },
  ): Promise<UserOutputLogin> {
    const user = await this.userService.create(data);
    const result = await this.authService.login(user);

    setTokenCookie(context.res, result?.access_token ?? '');

    return result;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  public async logout(
    @Context() context: { res: ServerResponse },
  ): Promise<boolean> {
    removeTokenCookie(context.res);

    return true;
  }
}

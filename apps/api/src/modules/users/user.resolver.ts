import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from './user.decorator';
import { UserInputCreate } from './create-user.input';
import { UserInputLogin } from './login-user.input';
import { UserOutputLogin } from './login-user.output';
import { User } from './user.entity';
import { UserService } from './user.service';
import { setTokenCookie } from 'src/utils/auth-cookies';
import { ServerResponse } from 'http';

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
  ): Promise<UserOutputLogin> {
    const user = await this.userService.create(data);

    return await this.authService.login(user);
  }
}

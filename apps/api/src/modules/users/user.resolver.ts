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
import { Roles as RolesEnum } from '../users/user.schema';
import { User } from './user.schema';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ResetPasswordInput } from './reset-password.input';
import { UserInputUpdateNames } from './update-user-names.input';
import { UserInputUpdatePassword } from './update-user-password.input';
import { SocialAuthInput } from '../auth/social-auth.input';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => User)
  public async user(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => UserOutputLogin)
  public async login(
    @Args('data') data: UserInputLogin,
    @Context() context: { res: ServerResponse },
  ) {
    const result = await this.authService.validateUserAndLogin(data);

    setTokenCookie(context.res, result?.access_token ?? '');

    return result;
  }

  @Mutation(() => UserOutputLogin, { nullable: true })
  public async loginSocial(
    @Context() context: { res: ServerResponse },
    @Args('data') data: SocialAuthInput,
  ) {
    return await this.authService.loginSocial(data);
  }

  @Mutation(() => UserOutputLogin)
  public async register(
    @Args('data') data: UserInputCreate,
    @Context() context: { res: ServerResponse },
  ) {
    const result = await this.authService.register(data);

    setTokenCookie(context.res, result?.access_token ?? '');

    return result;
  }

  @Mutation(() => UserOutputLogin)
  public async registerSocial(
    @Args('data') data: SocialAuthInput,
    @Context() context: { res: ServerResponse },
  ) {
    const result = await this.authService.registerSocial(data);

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

  @Mutation(() => Boolean)
  async forgotPassword(@Args('email') email: string) {
    return await this.userService.forgotPassword(email);
  }

  @Mutation(() => User)
  async resetPassword(@Args('data') data: ResetPasswordInput) {
    return await this.userService.resetPassword(data);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => User)
  async updateUserNames(
    @Args('data') data: UserInputUpdateNames,
    @CurrentUser() user: User,
  ) {
    return await this.userService.updateNames(data, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => User)
  async updateUserPassword(
    @Args('data') data: UserInputUpdatePassword,
    @CurrentUser() user: User,
  ) {
    return await this.userService.updatePassword(data, user._id);
  }
}

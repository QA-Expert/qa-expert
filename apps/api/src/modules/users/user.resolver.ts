import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { UserInputCreate } from './create-user.input';
import { UserInputLogin } from './login-user.input';
import { UserOutputLogin } from './login-user.output';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // @UseGuards(GqlAuthGuard)
  @Query(() => User)
  public async userById(@Args('id') id: string): Promise<User | null> {
    return await this.userService.findById(id);
  }

  @Query(() => User)
  public async userByEmail(@Args('email') email: string): Promise<User | null> {
    return await this.userService.findByEmail(email);
  }

  @Mutation(() => UserOutputLogin)
  public async login(
    @Args('data') data: UserInputLogin,
  ): Promise<UserOutputLogin | null> {
    return await this.authService.validateUserAndLogin(data);
  }

  @Mutation(() => UserOutputLogin)
  public async register(
    @Args('data') data: UserInputCreate,
  ): Promise<UserOutputLogin> {
    const user = await this.userService.create(data);

    return await this.authService.login(user);
  }
}

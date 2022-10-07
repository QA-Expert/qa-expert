import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
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

  @Query(() => User)
  public async userById(@Args('id') id: string): Promise<User | null> {
    return await this.userService.findById(id);
  }

  @Query(() => User)
  public async userByEmail(@Args('email') email: string): Promise<User | null> {
    return await this.userService.findByEmail(email);
  }

  @UseGuards(LocalAuthGuard)
  @Query(() => UserOutputLogin)
  public async login(
    @Args('data') data: UserInputLogin,
  ): Promise<UserOutputLogin | null> {
    return await this.authService.validateUser(data);
  }

  // @Mutation(() => User)
  // public async register(@Args('data') input: UserInputCreate): Promise<User> {
  //   const { id, email } = await this.userService.create(input);

  //   if (id && email) {
  //     return await this.userService.createToken({ id, email });
  //   }
  // }
}

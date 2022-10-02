import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UserInput } from './create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUserById(@Args('id') id: string): Promise<User | null> {
    return await this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') input: UserInput): Promise<User> {
    return await this.userService.createUser(input);
  }
}

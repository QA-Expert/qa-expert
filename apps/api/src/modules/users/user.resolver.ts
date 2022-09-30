import { Int, Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { User, UserInput } from './user.model';
import { UserService } from './user.service';

@Resolver((of: any) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  async getUserById(@Args('id') id: string): Promise<User | null> {
    return await this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') input: UserInput): Promise<User> {
    return await this.userService.createUser(input);
  }
}

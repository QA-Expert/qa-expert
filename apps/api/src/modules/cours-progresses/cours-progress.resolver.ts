import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { User } from '../users/user.entity';
import { CoursProgress } from './cours-progress.entity';
import { CoursProgressService } from './cours-progress.service';
import { CoursProgressInput } from './create-cours-progress.input';

@Resolver(() => CoursProgress)
export class CoursProgressResolver {
  constructor(private readonly service: CoursProgressService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [CoursProgress])
  public async coursProgresses(
    @CurrentUser() user: User,
    @Args('coursId') coursId: string,
  ): Promise<CoursProgress[] | null> {
    return await this.service.findAll(user.id, coursId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CoursProgress)
  public async createCoursProgress(
    @Args('data') input: CoursProgressInput,
  ): Promise<CoursProgress> {
    return await this.service.create(input);
  }
}

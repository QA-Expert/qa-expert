import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { CoursProgress } from './cours-progress.entity';
import { CoursProgressService } from './cours-progress.service';
import { CoursProgressInput } from './create-cours-progress.input';

@Resolver(() => CoursProgress)
export class CoursProgressResolver {
  constructor(private readonly service: CoursProgressService) {}

  @Query(() => [CoursProgress])
  public async coursProgresses(
    @Args('userId') userId: string,
    @Args('coursId') coursId: string,
  ): Promise<CoursProgress[] | null> {
    return await this.service.findAll(userId, coursId);
  }

  @Mutation(() => CoursProgress)
  public async createCoursProgress(
    @Args('data') input: CoursProgressInput,
  ): Promise<CoursProgress> {
    return await this.service.create(input);
  }
}

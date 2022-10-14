import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { User } from '../users/user.entity';
import { CourseProgress } from './course-progress.entity';
import { CourseProgressService } from './course-progress.service';
import { CourseProgressInput } from './create-course-progress.input';

@Resolver(() => CourseProgress)
export class CourseProgressResolver {
  constructor(private readonly service: CourseProgressService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [CourseProgress])
  public async coursProgresses(
    @CurrentUser() user: User,
    @Args('courseId') courseId: string,
  ): Promise<CourseProgress[] | null> {
    return await this.service.findAll(user.id, courseId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CourseProgress)
  public async createCoursProgress(
    @Args('data') input: CourseProgressInput,
  ): Promise<CourseProgress> {
    return await this.service.create(input);
  }
}

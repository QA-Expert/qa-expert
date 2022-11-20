import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../users/user.decorator';
import { User, Roles as RolesEnum } from '../users/user.schema';
import { CoursePageProgressInput } from './create-course-page-progress.input';
import { QuizPageProgressInput } from './create-quiz-page-progress.input';
import { PageProgress } from './page-progress.schema';
import { PageProgressService } from './page-progress.service';

@Resolver(() => PageProgress)
export class PageProgressResolver {
  constructor(private readonly service: PageProgressService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => PageProgress)
  public async createCoursePageProgress(
    @CurrentUser() user: User,
    @Args('data') input: CoursePageProgressInput,
  ): Promise<PageProgress> {
    return await this.service.createCoursePageProgress(input, user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => PageProgress)
  public async createQuizPageProgress(
    @CurrentUser() user: User,
    @Args('data') input: QuizPageProgressInput,
  ): Promise<PageProgress> {
    return await this.service.createQuizPageProgress(input, user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => Boolean)
  public async deletePagesProgresses(
    @CurrentUser() user: User,
    @Args('pages', { type: () => [String] }) pages: string[],
  ): Promise<boolean> {
    return await this.service.removeMany(pages, user._id);
  }
}

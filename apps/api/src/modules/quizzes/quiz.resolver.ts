import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ProgressPercentage } from '../common/common';
import { CurrentUser } from '../users/user.decorator';
import { Roles as RolesEnum, User } from '../users/user.schema';
import { Quiz } from './quiz.schema';
import { QuizService } from './quiz.service';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private readonly service: QuizService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => Quiz)
  public async quiz(@Args('_id') _id: string): Promise<Quiz | null> {
    return await this.service.findById(_id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => [Quiz])
  public async quizzes(): Promise<Quiz[]> {
    return await this.service.findAll();
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @ResolveField('progress', () => ProgressPercentage)
  public async quizProgresses(
    @CurrentUser() user: User,
    @Parent() quiz: Quiz,
  ): Promise<ProgressPercentage> {
    return await this.service.findProgress(quiz, user);
  }
}

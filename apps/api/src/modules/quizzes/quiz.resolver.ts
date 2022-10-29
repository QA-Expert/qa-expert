import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { QuizProgressService } from '../quiz-progresses/quiz-progress.service';
import { CurrentUser } from '../users/user.decorator';
import { Roles as RolesEnum, User } from '../users/user.schema';
import { Quiz } from './quiz.schema';
import { QuizService } from './quiz.service';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(
    private readonly service: QuizService,
    private readonly serviceQuizProgress: QuizProgressService,
  ) {}

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
  @ResolveField('progress', () => Number, { nullable: true })
  public async quizProgresses(
    @CurrentUser() user: User,
    @Parent() quiz: Quiz,
  ): Promise<number | null> {
    const progresses = await this.serviceQuizProgress.findQuizProgress(
      quiz._id,
      user._id,
    );

    if (quiz?.quizPages?.length && progresses?.length) {
      return Math.floor(quiz?.quizPages.length / progresses?.length) * 100;
    }

    return 0;
  }
}

import { Resolver, ResolveField, Args, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { QuizPage } from './quiz-page.schema';
import { QuizProgressService } from '../quiz-progresses/quiz-progress.service';
import { QuizProgress } from '../quiz-progresses/quiz-progress.schema';
import { User, Roles as RolesEnum } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Resolver(() => QuizPage)
export class QuizPageResolver {
  constructor(private readonly service: QuizProgressService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @ResolveField('progress', () => QuizProgress, { nullable: true })
  public async quizProgresses(
    @CurrentUser() user: User,
    @Parent() quizPage: QuizPage,
    @Args('quizId') quizId: string,
  ): Promise<QuizProgress | null> {
    return await this.service.findOne(quizId, quizPage._id, user._id);
  }
}

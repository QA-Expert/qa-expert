import { Resolver, ResolveField, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { QuizPage } from './quiz-page.schema';
import { QuizProgressService } from '../quiz-progresses/quiz-progress.service';
import { QuizProgress } from '../quiz-progresses/quiz-progress.schema';
import { User } from '../users/user.schema';

@Resolver(() => QuizPage)
export class QuizPageResolver {
  constructor(private readonly service: QuizProgressService) {}

  @UseGuards(GqlAuthGuard)
  @ResolveField('progresses', () => [QuizProgress])
  public async quizProgresses(
    @CurrentUser() user: User,
    @Args('_id') _id: string,
  ): Promise<QuizProgress[] | null> {
    return await this.service.findAll(_id, user._id);
  }
}

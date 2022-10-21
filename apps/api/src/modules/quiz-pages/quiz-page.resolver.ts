import { Resolver, ResolveField, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { User } from '../users/user.entity';
import { QuizPage } from '../quiz-pages/quiz-page.entity';
import { QuizProgressService } from '../quiz-progresses/quiz-progress.service';
import { QuizProgress } from '../quiz-progresses/quiz-progress.entity';

@Resolver(() => QuizPage)
export class QuizPageResolver {
  constructor(private readonly service: QuizProgressService) {}

  @UseGuards(GqlAuthGuard)
  @ResolveField('progresses', () => [QuizProgress])
  public async quizProgresses(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<QuizProgress[] | null> {
    return await this.service.findAll(id, user.id);
  }
}

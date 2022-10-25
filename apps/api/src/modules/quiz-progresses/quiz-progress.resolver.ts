import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { QuizProgressService } from './quiz-progress.service';
import { QuizProgressInput } from './create-quiz-progress.input';
import { QuizProgress } from './quiz-progress.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { User, Roles as RolesEnum } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Resolver(() => QuizProgress)
export class QuizProgressResolver {
  constructor(private readonly service: QuizProgressService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => QuizProgress)
  public async createQuizProgress(
    @CurrentUser() user: User,
    @Args('data') input: QuizProgressInput,
  ): Promise<QuizProgress> {
    return await this.service.create(input, user._id);
  }
}

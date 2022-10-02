import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { QuizProgressService } from './quiz-progress.service';
import { QuizProgressInput } from './create-quiz-progress.input';
import { QuizProgress } from './quiz-progress.entity';

@Resolver(() => QuizProgress)
export class QuizProgressResolver {
  constructor(private readonly service: QuizProgressService) {}

  @Query(() => [QuizProgress])
  public async quizProgresses(
    @Args('userId') userId: string,
    @Args('quizId') coursId: string,
  ): Promise<QuizProgress[] | null> {
    return await this.service.findAll(userId, coursId);
  }

  @Mutation(() => QuizProgress)
  public async createQuizProgress(
    @Args('data') input: QuizProgressInput,
  ): Promise<QuizProgress> {
    return await this.service.create(input);
  }
}

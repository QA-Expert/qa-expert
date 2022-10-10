import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private readonly service: QuizService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Quiz)
  public async quiz(@Args('id') id: string): Promise<Quiz | null> {
    return await this.service.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Quiz])
  public async quizzes(): Promise<Quiz[]> {
    return await this.service.findAll();
  }
}

import { Args, Query, Resolver } from '@nestjs/graphql';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private readonly service: QuizService) {}

  @Query(() => Quiz)
  async getById(@Args('id') id: string): Promise<Quiz | null> {
    return await this.service.findById(id);
  }
}

import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { Answer } from './answer.entity';
import { AnswerService } from './answer.service';
import { AnswerInput } from './create-answer.input';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly service: AnswerService) {}

  @Query(() => Answer)
  async answer(
    @Args('userId') userId: string,
    @Args('quizPageId') quizPageId: string,
  ): Promise<Answer | null> {
    return await this.service.findOn(userId, quizPageId);
  }

  @Mutation(() => Answer)
  async createAnswer(@Args('data') input: AnswerInput): Promise<Answer> {
    return await this.service.create(input);
  }
}

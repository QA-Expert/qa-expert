import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles as RolesEnum } from '../users/user.schema';
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
}

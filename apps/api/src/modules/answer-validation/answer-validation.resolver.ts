import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles as RolesEnum } from '../users/user.schema';
import { AnswerValidationRestApiOutput } from './answer-validation-rest-api.output';
import { AnswerValidationService } from './answer-validation.service';

@Resolver()
export class AnswerValidationResolver {
  constructor(private readonly service: AnswerValidationService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => AnswerValidationRestApiOutput)
  public async validateRestApi(
    @Args('stringifiedRequestData') stringifiedRequestData: string,
    @Args('expectedAnswerId') expectedAnswerId: string,
  ): Promise<AnswerValidationRestApiOutput> {
    return await this.service.getRestApiResponse({
      data: stringifiedRequestData,
      expectedAnswerId: expectedAnswerId,
    });
  }
}

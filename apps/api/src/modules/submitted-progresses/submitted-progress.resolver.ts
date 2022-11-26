import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../users/user.decorator';
import { User, Roles as RolesEnum } from '../users/user.schema';
import { SubmittedProgress } from './submitted-progress.schema';
import { SubmittedProgressService } from './submitted-progress.service';

@Resolver(() => SubmittedProgress)
export class SubmittedProgressResolver {
  constructor(private readonly service: SubmittedProgressService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => [SubmittedProgress])
  public async submittedProgresses(
    @CurrentUser() user: User,
  ): Promise<SubmittedProgress[]> {
    return await this.service.findAll(user._id);
  }
}

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../users/user.decorator';
import { User, Roles as RolesEnum } from '../users/user.schema';
import { UnlockedBadge } from './unlocked-badge.schema';
import { UnlockedBadgeService } from './unlocked-badge.service';

@Resolver(() => UnlockedBadge)
export class UnlockedBadgeResolver {
  constructor(private readonly service: UnlockedBadgeService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => [UnlockedBadge])
  public async unlockedBadges(
    @CurrentUser() user: User,
  ): Promise<UnlockedBadge[]> {
    return await this.service.findAll(user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => UnlockedBadge)
  async claimBadge(
    @CurrentUser() user: User,
    @Args('badgeId') badgeId: string,
  ): Promise<UnlockedBadge | null> {
    return await this.service.add(badgeId, user._id);
  }
}

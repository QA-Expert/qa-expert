import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../users/user.decorator';
import { User, Roles as RolesEnum } from '../users/user.schema';
import { ClaimedBadge } from './claimed-badge.schema';
import { ClaimedBadgeService } from './claimed-badge.service';

@Resolver(() => ClaimedBadge)
export class ClaimedBadgeResolver {
  constructor(private readonly service: ClaimedBadgeService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => [ClaimedBadge])
  public async claimedBadges(
    @CurrentUser() user: User,
  ): Promise<ClaimedBadge[]> {
    return await this.service.findAll(user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => ClaimedBadge)
  async claimBadge(
    @CurrentUser() user: User,
    @Args('badgeId') badgeId: string,
  ): Promise<ClaimedBadge | null> {
    return await this.service.add(badgeId, user._id);
  }
}

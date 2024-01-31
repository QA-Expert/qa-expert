import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/graphql-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { CurrentUser } from '../../users/user.decorator';
import { User, Roles as RolesEnum } from '../../users/user.schema';
import { Subscription } from './subscription.schema';
import { SubscriptionService } from './subscription.service';

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(private readonly service: SubscriptionService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => Subscription, { nullable: true })
  public async transactions(
    @CurrentUser() user: User,
  ): Promise<Subscription | null> {
    return await this.service.findOneByUserId(user._id);
  }
}

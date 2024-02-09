import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/graphql-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { CurrentUser } from '../../users/user.decorator';
import { User, Roles as RolesEnum } from '../../users/user.schema';
import { Price, Subscription } from './subscription.schema';
import { SubscriptionService } from './subscription.service';
import { SubscriptionInput } from './subscription.input';
import { SubscriptionOutput } from './subscription.output';

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(private readonly service: SubscriptionService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => SubscriptionOutput, { nullable: true })
  public async subscription(@CurrentUser() user: User) {
    return await this.service.retrieve(user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => [Price])
  public async prices() {
    return await this.service.getPrices();
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => Subscription)
  public async subscribe(
    @CurrentUser() user: User,
    @Args('data') data: SubscriptionInput,
  ) {
    return await this.service.create(data, user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => Subscription)
  public async cancelSubscription(@CurrentUser() user: User) {
    return await this.service.cancel(user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => Subscription)
  public async activateSubscription(
    @CurrentUser() user: User,
    @Args('data') data: SubscriptionInput,
  ) {
    return await this.service.activate(data, user._id);
  }
}

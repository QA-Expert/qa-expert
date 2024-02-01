import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/graphql-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { CurrentUser } from '../../users/user.decorator';
import { User, Roles as RolesEnum } from '../../users/user.schema';
import { PaymentMethod } from './payment-method.schema';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodInput } from './payment-method.input';
import { PaymentMethodOutput } from './payment-method.output';

@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
  constructor(private readonly service: PaymentMethodService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => PaymentMethodOutput, { nullable: true })
  public async paymentMethod(@CurrentUser() user: User) {
    return await this.service.retrieve(user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => PaymentMethod)
  public async addPaymentMethod(
    @CurrentUser() user: User,
    @Args('data') data: PaymentMethodInput,
  ) {
    return await this.service.create(data, user);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => PaymentMethod)
  public async updatePaymentMethod(
    @CurrentUser() user: User,
    @Args('data') data: PaymentMethodInput,
  ) {
    return await this.service.update(data, user);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => PaymentMethod)
  public async removePaymentMethod(@CurrentUser() user: User) {
    return await this.service.remove(user._id);
  }
}

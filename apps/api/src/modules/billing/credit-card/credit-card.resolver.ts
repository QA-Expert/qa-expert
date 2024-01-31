import { UseGuards } from '@nestjs/common';
import { Parent, Query, Resolver, ResolveField } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/graphql-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { CurrentUser } from '../../users/user.decorator';
import { User, Roles as RolesEnum } from '../../users/user.schema';
import { CreditCard } from './credit-card.schema';
import { CreditCardService } from './credit-card.service';
import { Address } from '../payment-method/payment-method.schema';

@Resolver(() => CreditCard)
export class CreditCardResolver {
  constructor(private readonly service: CreditCardService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => CreditCard, { nullable: true })
  public async creditCard(
    @CurrentUser() user: User,
  ): Promise<CreditCard | null> {
    return await this.service.findOne(user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @ResolveField('address', () => Address)
  public async badge(
    @Parent() creditCard: CreditCard,
  ): Promise<Address | null> {
    return await this.service.findAddress(creditCard);
  }
}

import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/graphql-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { CurrentUser } from '../../users/user.decorator';
import { User, Roles as RolesEnum } from '../../users/user.schema';
import { Transaction } from './transaction.schema';
import { TransactionService } from './transaction.service';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly service: TransactionService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => [Transaction])
  public async transactions(@CurrentUser() user: User): Promise<Transaction[]> {
    return await this.service.findAll(user._id);
  }
}

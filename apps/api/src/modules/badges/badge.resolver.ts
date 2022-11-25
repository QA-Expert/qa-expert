import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles as RolesEnum } from '../users/user.schema';
import { Badge } from './badge.schema';
import { BadgeService } from './badge.service';

@Resolver(() => Badge)
export class BadgeResolver {
  constructor(private readonly service: BadgeService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => [Badge])
  public async badges(): Promise<Badge[]> {
    return await this.service.findAll();
  }
}

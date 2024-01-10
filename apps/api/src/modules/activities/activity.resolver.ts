import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../users/user.decorator';
import { User, Roles as RolesEnum } from '../users/user.schema';
import { Activity } from './activity.schema';
import { ActivityService } from './activity.service';

@Resolver(() => Activity)
export class ActivityResolver {
  constructor(private readonly service: ActivityService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => [Activity])
  public async activities(@CurrentUser() user: User): Promise<Activity[]> {
    return await this.service.findAll(user._id);
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CourseProgressService } from './course-progress.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Roles as RolesEnum, User } from '../users/user.schema';
import { CurrentUser } from '../users/user.decorator';
import { CourseProgress } from './course-progress.schema';

@Resolver(() => CourseProgress)
export class CourseProgressResolver {
  constructor(private readonly service: CourseProgressService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => Boolean)
  public async deleteCourseProgresses(
    @CurrentUser() user: User,
    @Args('_id') _id: string,
  ): Promise<boolean> {
    return await this.service.removeCourseProgress(_id, user._id);
  }
}

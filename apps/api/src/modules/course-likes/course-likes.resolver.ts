import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../users/user.decorator';
import { User, Roles as RolesEnum } from '../users/user.schema';
import { CourseLike } from './course-likes.schema';
import { CourseLikeService } from './course-likes.service';

@Resolver(() => CourseLike)
export class CourseLikeResolver {
  constructor(private readonly service: CourseLikeService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => CourseLike)
  async likeCourse(
    @CurrentUser() user: User,
    @Args('courseId') courseId: string,
  ): Promise<CourseLike | null> {
    return await this.service.add(courseId, user._id);
  }
}

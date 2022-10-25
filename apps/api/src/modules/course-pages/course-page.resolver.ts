import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CoursePage } from './course-page.schema';
import { CoursePageService } from './course-page.service';
import { CoursePageContentInput } from './create-course-page-content.input';
import { Roles as RolesEnum } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Resolver(() => CoursePage)
export class CoursePageResolver {
  constructor(private readonly service: CoursePageService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Query(() => CoursePage)
  async updateCoursePageContent(
    @Args('_id') _id: string,
    @Args('data') data: CoursePageContentInput,
  ): Promise<CoursePage | null> {
    return await this.service.update(_id, data);
  }
}

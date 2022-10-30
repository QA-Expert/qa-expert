import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CoursePage } from './course-page.schema';
import { CoursePageService } from './course-page.service';
import { CoursePageContentInput } from './update-course-page-content.input';
import { Roles as RolesEnum, User } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CourseProgress } from '../course-progresses/course-progress.schema';
import { CurrentUser } from '../users/user.decorator';
import { CourseProgressService } from '../course-progresses/course-progress.service';
import { CoursePageInput } from './create-course-page.input';

@Resolver(() => CoursePage)
export class CoursePageResolver {
  constructor(
    private readonly service: CoursePageService,
    private readonly serviceCourseProgress: CourseProgressService,
  ) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Mutation(() => CoursePage)
  async updateCoursePageContent(
    @CurrentUser() user: User,
    @Args('_id') _id: string,
    @Args('data') data: CoursePageContentInput,
  ): Promise<CoursePage | null> {
    return await this.service.update(_id, data, user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Mutation(() => CoursePage)
  async createCoursePage(
    @CurrentUser() user: User,
    @Args('data') data: CoursePageInput,
  ): Promise<CoursePage | null> {
    return await this.service.create(data, user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @ResolveField('progress', () => CourseProgress, { nullable: true })
  public async courseProgresses(
    @CurrentUser() user: User,
    @Parent() coursePage: CoursePage,
    @Args('courseId') courseId: string,
  ): Promise<CourseProgress | null> {
    return await this.serviceCourseProgress.findOne(
      courseId,
      coursePage._id,
      user._id,
    );
  }
}

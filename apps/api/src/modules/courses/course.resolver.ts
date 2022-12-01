import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Course } from './course.schema';
import { CourseService } from './course.service';
import { Roles as RolesEnum, User } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../users/user.decorator';
import { Badge } from '../badges/badge.schema';
import { CourseProgressService } from '../course-progresses/course-progress.service';
import { TotalCourseProgress } from '../course-progresses/course-progress.schema';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private readonly service: CourseService,
    private readonly serviceCourseProgress: CourseProgressService,
  ) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => Course)
  async course(@Args('_id') _id: string): Promise<Course | null> {
    return await this.service.findById(_id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Query(() => [Course])
  public async courses(): Promise<Course[]> {
    return this.service.findAll();
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @ResolveField('progress', () => TotalCourseProgress)
  public async progress(
    @CurrentUser() user: User,
    @Parent() course: Course,
  ): Promise<TotalCourseProgress> {
    return await this.serviceCourseProgress.findTotalProgressByCourseId(
      course._id,
      user._id,
    );
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @ResolveField('badge', () => Badge)
  public async badge(@Parent() course: Course): Promise<Badge | null> {
    return await this.service.findBadge(course);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Mutation(() => Course)
  public async addPage(
    @CurrentUser() user: User,
    @Args('_id') _id: string,
    @Args('pageId') pageId: string,
  ): Promise<Course | null> {
    return this.service.addPage(_id, pageId, user._id);
  }
}

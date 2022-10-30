import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../users/user.decorator';
import { Page } from './page.schema';
import { Roles as RolesEnum, User } from '../users/user.schema';
import { PageService } from './page.service';
import { CoursePageInput } from './create-course-page.input';
import { Roles } from '../auth/roles.decorator';
import { QuizPageInput } from './create-quiz-page.input';
import { PageProgress } from '../page-progresses/page-progress.schema';
import { PageProgressService } from '../page-progresses/page-progress.service';
import { CoursePageContentInput } from './update-course-page-content.input';

@Resolver(() => Page)
export class PageResolver {
  constructor(
    private readonly service: PageService,
    private readonly servicePageProgress: PageProgressService,
  ) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Mutation(() => Page)
  async createCoursePage(
    @CurrentUser() user: User,
    @Args('data') data: CoursePageInput,
  ): Promise<Page | null> {
    return await this.service.createCoursePage(data, user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Mutation(() => Page)
  async createQuizPage(
    @CurrentUser() user: User,
    @Args('data') data: QuizPageInput,
  ): Promise<Page | null> {
    return await this.service.createQuizPage(data, user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @ResolveField('progress', () => PageProgress, { nullable: true })
  public async progress(
    @CurrentUser() user: User,
    @Parent() page: Page,
  ): Promise<PageProgress | null> {
    return await this.servicePageProgress.findOne(page._id, user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Mutation(() => Page)
  async updateCoursePageContent(
    @CurrentUser() user: User,
    @Args('_id') _id: string,
    @Args('data') data: CoursePageContentInput,
  ): Promise<Page | null> {
    return await this.service.update(_id, data, user._id);
  }
}

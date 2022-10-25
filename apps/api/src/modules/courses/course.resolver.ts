import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Course } from './course.schema';
import { CourseService } from './course.service';
import { Roles as RolesEnum } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly service: CourseService) {}

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
}

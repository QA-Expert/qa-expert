import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Course } from './course.schema';
import { CourseService } from './course.service';

@Resolver(() => Course)
export class CoursResolver {
  constructor(private readonly service: CourseService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Course)
  async course(@Args('id') id: string): Promise<Course | null> {
    return await this.service.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Course])
  public async courses(): Promise<Course[]> {
    return this.service.findAll();
  }
}

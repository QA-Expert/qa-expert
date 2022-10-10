import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Cours } from './cours.entity';
import { CoursService } from './cours.service';

@Resolver(() => Cours)
export class CoursResolver {
  constructor(private readonly service: CoursService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Cours)
  async cours(@Args('id') id: string): Promise<Cours | null> {
    return await this.service.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Cours])
  public async courses(): Promise<Cours[]> {
    return this.service.findAll();
  }
}

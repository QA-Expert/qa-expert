import { Args, Query, Resolver } from '@nestjs/graphql';
import { Cours } from './cours.entity';
import { CoursService } from './cours.service';

@Resolver(() => Cours)
export class CoursResolver {
  constructor(private readonly service: CoursService) {}

  @Query(() => Cours)
  async cours(@Args('id') id: string): Promise<Cours | null> {
    return await this.service.findById(id);
  }

  @Query(() => [Cours])
  public async courses(): Promise<Cours[]> {
    return this.service.findAll();
  }
}

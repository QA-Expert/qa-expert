import { Column } from 'typeorm';
import { Field, InterfaceType } from '@nestjs/graphql';
import { Base } from './base.entity';

@InterfaceType({ implements: Base })
export abstract class BaseContent extends Base {
  @Field()
  @Column('varchar', { length: 250, nullable: false })
  title: string;

  @Field()
  @Column('varchar', { length: 500, nullable: false })
  description: string;
}

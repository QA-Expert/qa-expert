import { Column } from 'typeorm';
import { Field, InterfaceType } from '@nestjs/graphql';
import { Base } from './base.entity';

@InterfaceType({ implements: Base })
export abstract class BaseContnet extends Base {
  @Field()
  @Column('text', { nullable: false })
  title: string;

  @Field()
  @Column('text', { nullable: false })
  desciption: string;
}

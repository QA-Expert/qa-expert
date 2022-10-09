import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseContnet } from 'src/modules/common/content-base.entity';
import { Base } from 'src/modules/common/base.entity';

@Entity('cours-pages')
@ObjectType({ implements: [BaseContnet, Base] })
export class CoursPage extends BaseContnet {
  @Field()
  @Column('text', { nullable: false })
  content: string;
}

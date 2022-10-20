import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseContent } from 'src/modules/common/content-base.entity';
import { Base } from 'src/modules/common/base.entity';

// TODO: add description to all props
@Entity('course-pages')
@ObjectType({ implements: [BaseContent, Base] })
export class CoursePage extends BaseContent {
  @Field()
  @Column('text', { nullable: false })
  content: string;
}

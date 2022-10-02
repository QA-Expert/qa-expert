import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';

@Entity('questions')
@ObjectType({ implements: [Base] })
export class Question extends Base {
  @Field()
  @Column('text', { nullable: false })
  content: string;

  @Field()
  @Column('text', { nullable: false })
  expectedResult: string;
}

import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { Question } from '../questions/question.entity';

@Entity('answers')
@ObjectType({ implements: [Base] })
export class Answer extends Base {
  @Field()
  @Column('text', { nullable: false })
  content: string;

  @ManyToMany(() => Question)
  @JoinTable()
  questions: Question[];
}

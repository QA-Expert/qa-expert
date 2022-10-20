import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { Question } from '../questions/question.entity';

// TODO: add description to all props
@Entity('answers')
@ObjectType({ implements: [Base] })
export class Answer extends Base {
  @Field()
  @Column('text', { nullable: false })
  content: string;

  @ManyToMany(() => Question, (question) => question.answers)
  @JoinTable()
  questions: Promise<Question[]>;

  @ManyToMany(() => Question, (question) => question.options)
  @JoinTable()
  options: Promise<Question[]>;
}

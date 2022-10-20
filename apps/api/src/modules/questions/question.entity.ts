import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { Answer } from '../answers/answer.entity';

// TODO: add description to all props
@Entity('questions')
@ObjectType({ implements: [Base] })
export class Question extends Base {
  @Field()
  @Column('text', { nullable: false })
  content: string;

  @ManyToMany(() => Answer, (answer) => answer.questions)
  @Field(() => [Answer])
  answers: Promise<Answer[]>;

  @ManyToMany(() => Answer, (answer) => answer.options)
  @Field(() => [Answer])
  options: Promise<Answer[]>;
}

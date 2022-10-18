import { Column, Entity, JoinTable, ManyToMany, RelationId } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { Answer } from '../answers/answer.entity';

@Entity('questions')
@ObjectType({ implements: [Base] })
export class Question extends Base {
  @Field()
  @Column('text', { nullable: false })
  content: string;

  @RelationId('answers')
  answerIds: string[];

  @ManyToMany(() => Answer, (answer) => answer.questions)
  @Field(() => [Answer])
  answers: Answer[];

  @RelationId('options')
  optionIds: string[];

  @ManyToMany(() => Answer, (answer) => answer.questions)
  @Field(() => [Answer])
  options: Answer[];
}

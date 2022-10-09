import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseContnet } from 'src/modules/common/content-base.entity';
import { Base } from 'src/modules/common/base.entity';
import { Question } from '../questions/question.entity';

@Entity('quiz-pages')
@ObjectType({ implements: [BaseContnet, Base] })
export class QuizPage extends BaseContnet {
  @Field()
  @Column('text')
  expectedResult: string;

  @ManyToMany(() => Question)
  @JoinTable()
  @Field(() => [Question])
  questions: Promise<Question[]>;
}

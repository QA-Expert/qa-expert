import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CoursPage } from '../cours-pages/cours-page.entity';
import { BaseContnet } from 'src/modules/common/base-content.entity';
import { Base } from 'src/modules/common/base.entity';
import { Quiz } from 'src/modules/quizzes/quiz.entity';

@Entity('courses')
@ObjectType({ implements: [BaseContnet, Base] })
export class Cours extends BaseContnet {
  @Field()
  @Column('text')
  icon: string;

  @ManyToMany(() => CoursPage)
  @JoinTable()
  @Field(() => [CoursPage])
  coursPages: Promise<CoursPage[]>;

  @ManyToMany(() => Quiz, (Quiz) => Quiz.courses)
  @Field(() => [Quiz])
  quizzes: Promise<Quiz[]>;
}

import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { Cours } from 'src/modules/courses/entities/course.entity';
import { Quiz } from 'src/modules/quizzes/quiz.entity';
import { CoursPage } from 'src/modules/course-pages/entities/course-page.entity';
import { QuizPage } from 'src/modules/quiz-pages/quiz-page.entity';
import { Answer } from 'src/modules/answers/answers.entity';

@Entity('users')
@ObjectType({ implements: [Base] })
export class User extends Base {
  @Field()
  @Index({ unique: true })
  @Column('varchar', { length: 320, nullable: false })
  email: string;

  @Field()
  @Column('varchar', { length: 100 })
  firstName: string;

  @Field()
  @Column('varchar', { length: 100 })
  lastName: string;

  @Column('text', { nullable: false })
  hashedPassword: string;

  @ManyToMany(() => Cours)
  @JoinTable()
  @Field(() => [Cours])
  courses: Promise<Cours[]>;

  @ManyToMany(() => Quiz)
  @JoinTable()
  @Field(() => [Quiz])
  quizzes: Promise<Quiz[]>;

  @ManyToMany(() => CoursPage)
  @JoinTable()
  @Field(() => [CoursPage])
  coursPages: Promise<CoursPage[]>;

  @ManyToMany(() => QuizPage)
  @JoinTable()
  @Field(() => [QuizPage])
  quizPages: Promise<QuizPage[]>;

  @OneToMany(() => Answer, (userQuizAnswer) => userQuizAnswer.user)
  @Field(() => [Answer])
  answers: Promise<Answer[]>;
}

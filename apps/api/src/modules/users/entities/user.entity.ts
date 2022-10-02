import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { Cours } from 'src/modules/courses/entities/course.entity';
import { Quiz } from 'src/modules/quizzes/quiz.entity';
import { CoursPage } from 'src/modules/course-pages/entities/course-page.entity';
import { QuizPage } from 'src/modules/quiz-pages/quiz-page.entity';

@Entity('users')
@ObjectType({ implements: [Base] })
export class User extends Base {
  @Field()
  @Column('text', { nullable: false })
  email: string;

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Column('text', { nullable: false })
  hashedPassword: string;

  @ManyToMany(() => Cours, (cours) => cours.users)
  @Field(() => [Cours], { nullable: false })
  courses: Promise<Cours[]>;

  @ManyToMany(() => Quiz, (quiz) => quiz.users)
  @Field(() => [Quiz], { nullable: false })
  quizzes: Promise<Quiz[]>;

  @ManyToMany(() => CoursPage, (coursPage) => coursPage.users)
  @Field(() => [CoursPage], { nullable: false })
  coursPages: Promise<CoursPage[]>;

  @ManyToMany(() => QuizPage, (quizPage) => quizPage.users)
  @Field(() => [QuizPage], { nullable: false })
  quizPages: Promise<QuizPage[]>;
}

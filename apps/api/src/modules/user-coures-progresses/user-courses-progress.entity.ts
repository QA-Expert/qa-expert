import { Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { QuizQuestion } from '../quiz-questions/quiz-questions.entity';
import { Cours } from '../courses/entities/course.entity';
import { CoursPage } from '../course-pages/entities/course-page.entity';

@Entity('user-quizzes-progresses')
@ObjectType({ implements: [Base] })
export class UserQuizAnswers extends Base {
  @Field()
  @ManyToMany(() => Cours, (cours) => cours.users)
  courses: Promise<Cours[]>;

  @Field()
  @ManyToMany(() => CoursPage, (page) => page.users)
  pages: Promise<CoursPage[]>;

  @Field(() => [QuizQuestion], { nullable: true })
  @ManyToMany(() => QuizQuestion, (quizQuestion) => quizQuestion.userAnswers)
  questions: Promise<QuizQuestion[]>;
}

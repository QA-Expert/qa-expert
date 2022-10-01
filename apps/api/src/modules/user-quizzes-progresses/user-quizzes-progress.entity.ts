import { Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { QuizQuestion } from '../quiz-questions/quiz-questions.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { QuizPage } from '../quiz-pages/quiz-page.entity';

@Entity('user-quizzes-progresses')
@ObjectType({ implements: [Base] })
export class UserQuizzesProgresses extends Base {
  @Field()
  @ManyToMany(() => Quiz, (quiz) => quiz.users)
  quizzes: Promise<Quiz[]>;

  @Field()
  @ManyToMany(() => QuizPage, (page) => page.users)
  pages: Promise<QuizPage[]>;

  @Field()
  @ManyToMany(() => QuizQuestion, (quizQuestion) => quizQuestion.userAnswers)
  @Field(() => [QuizQuestion], { nullable: true })
  questions: Promise<QuizQuestion[]>;
}

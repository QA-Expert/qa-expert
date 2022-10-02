import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseContnet } from 'src/modules/common/base-content.entity';
import { Base } from 'src/modules/common/base.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { QuizQuestion } from '../quiz-questions/quiz-questions.entity';
import { UserQuizAnswer } from '../user-quiz-answers/user-quiz-answers.entity';
import { User } from '../users/entities/user.entity';

@Entity('quiz-pages')
@ObjectType({ implements: [BaseContnet, Base] })
export class QuizPage extends BaseContnet {
  @Field()
  @Column('text', { nullable: true })
  expectedResult: string;

  @ManyToMany(() => Quiz, (quiz) => quiz.quizPages)
  @Field(() => [Quiz], { nullable: true })
  quizzes: Promise<Quiz[]>;

  @ManyToMany(() => QuizQuestion, (quizQuestion) => quizQuestion.quizPages)
  @Field(() => [QuizQuestion], { nullable: true })
  questions: Promise<QuizQuestion[]>;

  // TODO: Check if we create extra ref here that we can get rid of
  @ManyToMany(() => UserQuizAnswer, (userQuizAnswers) => userQuizAnswers.answer)
  @Field(() => [UserQuizAnswer], { nullable: true })
  userAnswers: Promise<UserQuizAnswer[]>;

  @ManyToMany(() => User, (user) => user.quizzes)
  @Field(() => [User], { nullable: true })
  users: Promise<User[]>;
}

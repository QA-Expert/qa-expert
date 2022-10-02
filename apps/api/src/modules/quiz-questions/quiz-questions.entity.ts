import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { QuizPage } from '../quiz-pages/quiz-page.entity';
import { UserQuizAnswer } from '../user-quiz-answers/user-quiz-answers.entity';

@Entity('quiz-questions')
@ObjectType({ implements: [Base] })
export class QuizQuestion extends Base {
  @Field()
  @Column('text', { nullable: false })
  content: string;

  @Field()
  @Column('text', { nullable: false })
  expectedResult: string;

  @Field()
  @ManyToMany(() => QuizPage, (quiz) => quiz.questions)
  @Field(() => [QuizPage], { nullable: false })
  quizPages: Promise<QuizPage[]>;

  @ManyToMany(() => UserQuizAnswer, (userQuizAnswers) => userQuizAnswers.answer)
  @Field(() => [UserQuizAnswer], { nullable: false })
  userAnswers: Promise<UserQuizAnswer[]>;
}

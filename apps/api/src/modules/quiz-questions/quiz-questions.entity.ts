import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { QuizPage } from '../quiz-pages/quiz-page.entity';
import { UserQuizAnswers } from '../user-quiz-answers/user-quiz-answers.entity';

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
  @Field(() => [QuizPage], { nullable: true })
  quizPages: Promise<QuizPage[]>;

  @ManyToMany(
    () => UserQuizAnswers,
    (userQuizAnswers) => userQuizAnswers.answer,
  )
  @Field(() => [UserQuizAnswers], { nullable: false })
  userAnswers: Promise<UserQuizAnswers[]>;
}

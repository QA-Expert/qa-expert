import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { QuizQuestion } from '../quiz-questions/quiz-questions.entity';

@Entity('user-quiz-answers')
@ObjectType({ implements: [Base] })
export class UserQuizAnswer extends Base {
  @Field()
  @Column('text', { nullable: false })
  answer: string; // TODO: figure out how to pass boolean, id

  @Field()
  @ManyToMany(() => QuizQuestion, (quizQuestion) => quizQuestion.userAnswers)
  @Field(() => [QuizQuestion], { nullable: true })
  questions: Promise<QuizQuestion[]>;
}

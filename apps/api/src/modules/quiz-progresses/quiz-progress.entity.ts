import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { User } from '../users/user.entity';
import { QuizPage } from '../quiz-pages/quiz-page.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { Answer } from '../answers/answer.entity';

export enum QuizPageProgressState {
  VISITED = 'visited',
  PASS = 'pass',
  FAIL = 'fail',
}

registerEnumType(QuizPageProgressState, {
  name: 'QuizPageProgressState',
  description:
    'Defines whether User passed or failed or just visited current quiz page',
});

@Entity('quiz-progresses')
@ObjectType({ implements: [Base] })
export class QuizProgress extends Base {
  @Field(() => QuizPageProgressState)
  @Column({ type: 'enum', enum: QuizPageProgressState, nullable: false })
  state: QuizPageProgressState;

  @Column('uuid')
  @Field()
  quizId: string;

  @ManyToOne(() => Quiz)
  quiz: Promise<Quiz>;

  @Column('uuid')
  @Field()
  quizPageId: string;

  @ManyToOne(() => QuizPage)
  quizPage: Promise<QuizPage>;

  @Column('uuid', { nullable: false })
  @Field()
  userId: string;

  @ManyToOne(() => User)
  user: Promise<User>;

  @Field(() => [Answer])
  @RelationId('answers')
  answerIds?: string[];

  @ManyToMany(() => Answer)
  @JoinTable()
  answers: Answer[];
}

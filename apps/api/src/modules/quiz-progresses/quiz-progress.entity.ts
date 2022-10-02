import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { User } from '../users/user.entity';
import { QuizPage } from '../quiz-pages/quiz-page.entity';
import { Quiz } from '../quizzes/quiz.entity';

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

  @Column()
  @Field()
  quizId: string;

  @ManyToOne(() => Quiz)
  quiz: Promise<Quiz>;

  @Column()
  @Field()
  quizPageId: string;

  @ManyToOne(() => QuizPage)
  quizPage: Promise<QuizPage>;

  @Column({ nullable: false })
  @Field()
  userId: string;

  @ManyToOne(() => User)
  user: Promise<User>;
}

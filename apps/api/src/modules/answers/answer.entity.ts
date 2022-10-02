import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { User } from '../users/user.entity';
import { QuizPage } from '../quiz-pages/quiz-page.entity';

@Entity('answers')
@ObjectType({ implements: [Base] })
export class Answer extends Base {
  @Field()
  @Column('text', { nullable: false })
  answer: string; // TODO: figure out how to pass boolean, id

  @Column({ nullable: false })
  @Field()
  quizPageId: string;

  @ManyToOne(() => QuizPage)
  quizPage: QuizPage;

  @Column({ nullable: false })
  @Field()
  userId: string;

  @ManyToOne(() => User)
  user: Promise<User>;
}

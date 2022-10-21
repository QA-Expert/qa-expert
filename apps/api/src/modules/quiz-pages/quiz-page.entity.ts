import { Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseContent } from 'src/modules/common/content-base.entity';
import { Base } from 'src/modules/common/base.entity';
import { Question } from '../questions/question.entity';
import { QuizProgress } from '../quiz-progresses/quiz-progress.entity';

// TODO: add description to all props
@Entity('quiz-pages')
@ObjectType({ implements: [BaseContent, Base] })
export class QuizPage extends BaseContent {
  @Field(() => Question)
  @ManyToOne(() => Question)
  question: Promise<Question>;

  @Field(() => [QuizProgress], { nullable: true })
  progresses: Promise<QuizProgress[]>;
}

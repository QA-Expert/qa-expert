import { Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseContent } from 'src/modules/common/content-base.entity';
import { Base } from 'src/modules/common/base.entity';
import { Question } from '../questions/question.entity';

@Entity('quiz-pages')
@ObjectType({ implements: [BaseContent, Base] })
export class QuizPage extends BaseContent {
  @Field(() => Question)
  @ManyToOne(() => Question)
  question: Question;
}

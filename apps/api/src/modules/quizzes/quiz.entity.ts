import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseContnet } from 'src/modules/common/base-content.entity';
import { Base } from 'src/modules/common/base.entity';
import { QuizPage } from '../quiz-pages/quiz-page.entity';
import { User } from '../users/entities/user.entity';

export enum QuizType {
  QUESTIONEER = 'Questioneer',
  PRACTICE = 'Practice',
}

registerEnumType(QuizType, {
  name: 'QuizType',
  description: 'Defines different type of quizzes platform could have',
});

@Entity('quizzes')
@ObjectType({ implements: [BaseContnet, Base] })
export class Quiz extends BaseContnet {
  @Field(() => QuizType)
  @Column({ type: 'enum', enum: QuizType, nullable: false })
  type: QuizType;

  @ManyToMany(() => QuizPage, (quizPage) => quizPage.quizzes)
  @Field(() => [QuizPage], { nullable: true })
  quizPages: Promise<QuizPage[]>;

  @ManyToMany(() => User, (user) => user.quizzes)
  @Field(() => [User], { nullable: false })
  users: Promise<User[]>;

  @Field()
  @Column('text', { nullable: false })
  expectedResult: string;
}

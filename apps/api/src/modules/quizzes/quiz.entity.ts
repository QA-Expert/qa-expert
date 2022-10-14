import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseContnet } from 'src/modules/common/content-base.entity';
import { Base } from 'src/modules/common/base.entity';
import { QuizPage } from '../quiz-pages/quiz-page.entity';
import { Course } from '../courses/course.entity';

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

  @ManyToMany(() => QuizPage)
  @JoinTable()
  @Field(() => [QuizPage])
  quizPages: Promise<QuizPage[]>;

  @ManyToMany(() => Course, (course) => course.quizzes)
  @Field(() => [Course])
  courses: Promise<Course[]>;

  @Field()
  @Column('text')
  expectedResult: string;
}

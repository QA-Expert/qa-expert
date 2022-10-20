import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CoursePage } from '../course-pages/course-page.entity';
import { BaseContent } from 'src/modules/common/content-base.entity';
import { Base } from 'src/modules/common/base.entity';
import { Quiz } from 'src/modules/quizzes/quiz.entity';

// TODO: add description to all props
@Entity('courses')
@ObjectType({ implements: [BaseContent, Base] })
export class Course extends BaseContent {
  @Field()
  @Column('text')
  icon: string;

  @ManyToMany(() => CoursePage)
  @JoinTable()
  @Field(() => [CoursePage])
  coursePages: Promise<CoursePage[]>;

  @ManyToMany(() => Quiz, (Quiz) => Quiz.courses)
  @Field(() => [Quiz])
  quizzes: Promise<Quiz[]>;
}

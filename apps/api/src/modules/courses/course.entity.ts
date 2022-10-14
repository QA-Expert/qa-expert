import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CoursePage } from '../course-pages/course-page.entity';
import { BaseContnet } from 'src/modules/common/content-base.entity';
import { Base } from 'src/modules/common/base.entity';
import { Quiz } from 'src/modules/quizzes/quiz.entity';

@Entity('courses')
@ObjectType({ implements: [BaseContnet, Base] })
export class Course extends BaseContnet {
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

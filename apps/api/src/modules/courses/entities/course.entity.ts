import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CoursPage } from '../../course-pages/entities/course-page.entity';
import { BaseContnet } from 'src/modules/common/base-content.entity';
import { Base } from 'src/modules/common/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Quiz } from 'src/modules/quizzes/quiz.entity';

@Entity('courses')
@ObjectType({ implements: [BaseContnet, Base] })
export class Cours extends BaseContnet {
  @Field()
  @Column('text', { nullable: true })
  icon: string;

  @ManyToMany(() => CoursPage, (coursPage) => coursPage.courses)
  @Field(() => [CoursPage], { nullable: true })
  coursPages: Promise<CoursPage[]>;

  @ManyToMany(() => User, (user) => user.courses)
  @Field(() => [User], { nullable: true })
  users: Promise<User[]>;

  @ManyToMany(() => Quiz, (Quiz) => Quiz.courses)
  @Field(() => [Quiz], { nullable: true })
  quizzes: Promise<Quiz[]>;
}

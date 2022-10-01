import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Cours } from '../../courses/entities/course.entity';
import { BaseContnet } from 'src/modules/common/base-content.entity';
import { Base } from 'src/modules/common/base.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('cours-pages')
@ObjectType({ implements: [BaseContnet, Base] })
export class CoursPage extends BaseContnet {
  @Field()
  @Column('text', { nullable: false })
  content: string;

  @Field()
  @ManyToMany(() => Cours, (cours) => cours.coursPages)
  @Field(() => [Cours], { nullable: true })
  courses: Promise<Cours[]>;

  @ManyToMany(() => User, (user) => user.quizzes)
  @Field(() => [User], { nullable: false })
  users: Promise<User[]>;
}

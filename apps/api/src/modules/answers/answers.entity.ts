import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { Question } from '../questions/questions.entity';
import { User } from '../users/user.entity';

@Entity('answers')
@ObjectType({ implements: [Base] })
export class Answer extends Base {
  @Field()
  @Column('text', { nullable: false })
  answer: string; // TODO: figure out how to pass boolean, id

  @OneToOne(() => Question)
  @Field(() => [Question], { nullable: false })
  question: Promise<Question>;

  @ManyToOne(() => User, (user) => user.answers)
  @Field(() => [User], { nullable: false })
  user: Promise<User>;
}

import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { User } from '../users/user.entity';
import { CoursPage } from '../cours-pages/cours-page.entity';
import { Cours } from '../courses/cours.entity';

@Entity('cours-progresses')
@ObjectType({ implements: [Base] })
export class CoursProgress extends Base {
  @Column()
  @Field()
  coursId: string;

  @ManyToOne(() => Cours)
  cours: Promise<Cours>;

  @Column()
  @Field()
  coursPageId: string;

  @ManyToOne(() => CoursPage)
  coursPage: Promise<CoursPage>;

  @Column({ nullable: false })
  @Field()
  userId: string;

  @ManyToOne(() => User)
  user: Promise<User>;
}

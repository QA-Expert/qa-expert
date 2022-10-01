import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';

@Entity('users')
@ObjectType({ implements: [Base] })
export class User extends Base {
  @Field()
  @Column('text', { nullable: false })
  email: string;

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Column('text', { nullable: false })
  hashedPassword: string;
}

import { Column, Entity, Index } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';

@Entity('users')
@ObjectType({ implements: [Base] })
export class User extends Base {
  @Field()
  @Index({ unique: true })
  @Column('varchar', { length: 320, nullable: false })
  email: string;

  @Field()
  @Column('varchar', { length: 100 })
  firstName: string;

  @Field()
  @Column('varchar', { length: 100 })
  lastName: string;

  @Column('text', { nullable: false })
  hashedPassword: string;
}

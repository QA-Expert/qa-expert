import { Column, Entity, Index } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { MaxLength } from 'class-validator';

// TODO: add description to all props
@Entity('users')
@ObjectType({ implements: [Base] })
export class User extends Base {
  @Field()
  @MaxLength(320)
  @Index({ unique: true })
  @Column('varchar', { length: 320, nullable: false })
  email: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @Column('varchar', { length: 100, nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @Column('varchar', { length: 100, nullable: true })
  lastName: string;

  @Column('text', { nullable: false })
  hashedPassword: string;
}

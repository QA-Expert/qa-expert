import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, InterfaceType } from '@nestjs/graphql';
import { User } from '../users/user.entity';

@InterfaceType()
export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  createdBy: User;

  @Column()
  updatedBy: User;
}

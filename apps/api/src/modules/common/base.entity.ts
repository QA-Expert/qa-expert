import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, InterfaceType } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';

@InterfaceType()
export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy: User;

  @Column({ nullable: true })
  updatedBy: User;
}

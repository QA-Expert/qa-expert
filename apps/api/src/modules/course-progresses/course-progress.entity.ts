import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/modules/common/base.entity';
import { User } from '../users/user.entity';
import { CoursePage } from '../course-pages/course-page.entity';
import { Course } from '../courses/course.entity';

@Entity('course-progresses')
@ObjectType({ implements: [Base] })
export class CourseProgress extends Base {
  @Column('uuid')
  @Field()
  courseId: string;

  @ManyToOne(() => Course)
  course: Promise<Course>;

  @Column('uuid')
  @Field()
  coursePageId: string;

  @ManyToOne(() => CoursePage)
  coursePage: Promise<CoursePage>;

  @Column('uuid', { nullable: false })
  @Field()
  userId: string;

  @ManyToOne(() => User)
  user: Promise<User>;
}

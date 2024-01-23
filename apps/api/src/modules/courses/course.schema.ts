import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Page } from '../pages/page.schema';
import { Badge } from '../badges/badge.schema';
import { TotalCourseProgress } from '../course-progresses/course-progress.schema';

export enum CourseType {
  COURSE = 'course',
  QUIZ = 'quiz',
}

registerEnumType(CourseType, {
  name: 'CourseType',
  description: 'Defines the type of the course',
});

export enum CourseLevel {
  BEGINNER,
  INTERMEDIATE,
  ADVANCED,
  EXPERT,
}

registerEnumType(CourseLevel, {
  name: 'CourseLevel',
  description: 'Defines the level of the course',
});

export enum Tag {
  AI = 'AI',
}

registerEnumType(Tag, {
  name: 'Tag',
  description: 'Defines the course tags',
});

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: add description to all props
@Schema({ timestamps: true })
@ObjectType()
export class Course extends mongoose.Document {
  @Field(() => String)
  _id: string;

  @Field({ description: 'Course title' })
  @Prop()
  title: string;

  @Field({ description: 'Course description' })
  @Prop()
  description: string;

  @Prop({ type: String, enum: CourseType, required: true })
  @Field(() => CourseType)
  type: CourseType;

  @Prop({ type: Number, enum: CourseLevel, required: true })
  @Field(() => CourseLevel, {
    description:
      'Defines level of skill that user gains after finishing the course',
  })
  level: CourseLevel;

  @Field({ description: 'Icon url' })
  @Prop()
  icon: string;

  @Prop({ type: [{ type: ObjectId, ref: Page.name }], default: [] })
  @Field(() => [Page], {
    defaultValue: [],
    description: 'Pages included in course',
  })
  pages: Page[];

  @Field(() => TotalCourseProgress, {
    description: 'Course progress',
  })
  progress: TotalCourseProgress;

  @Field(() => Number, {
    description: 'Number of likes people gave to the course',
  })
  likes: number;

  @Field(() => Boolean, {
    description: 'Flag that indicates if course was already liked by user',
  })
  isLiked: boolean;

  @Prop({ type: [{ type: ObjectId, ref: Course.name }], default: [] })
  @Field(() => [Course], {
    defaultValue: [],
    description: 'Next recommended courses',
  })
  recommendedCourses: Course[];

  @Prop({ type: [{ type: String, enum: Tag }], default: [] })
  @Field(() => [Tag], {
    defaultValue: [],
    description:
      'Collection of strings that describe features of the course. Help to filter courses by specific tag/s',
  })
  tags: Tag[];

  @Field(() => Badge, {
    nullable: true,
    description: 'Achievement upon successful completion of course',
  })
  badge: Badge;

  @Prop({
    type: ObjectId,
    ref: 'User',
  })
  createdBy: User | mongoose.Types.ObjectId;

  @Prop({
    type: ObjectId,
    ref: 'User',
  })
  updatedBy: User | mongoose.Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

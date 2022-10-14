import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from './modules/answers/answer.module';
import { CourseProgressModule } from './modules/course-progresses/course-progress.module';
import { CourseModule } from './modules/courses/course.module';
import { QuizProgressModule } from './modules/quiz-progresses/quiz-progress.module';
import { QuizModule } from './modules/quizzes/quiz.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Course } from './modules/courses/course.entity';
import { Quiz } from './modules/quizzes/quiz.entity';
import { CoursePage } from './modules/course-pages/course-page.entity';
import { QuizPage } from './modules/quiz-pages/quiz-page.entity';
import { Question } from './modules/questions/question.entity';
import { Answer } from './modules/answers/answer.entity';
import { CourseProgress } from './modules/course-progresses/course-progress.entity';
import { QuizProgress } from './modules/quiz-progresses/quiz-progress.entity';
import { User } from './modules/users/user.entity';
import { join } from 'path';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: {
        expiresIn: process.env.AUTH_TOKEN_EXPIRES_IN,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: Boolean(process.env.SHOULD_GENERATE_GQL_SHEMA)
        ? join(
            process.cwd(),
            '../../packages/graphql-schema-gen/schema.gen.gql',
          )
        : undefined,
      definitions: {
        path: Boolean(process.env.SHOULD_GENERATE_GQL_SHEMA)
          ? join(
              process.cwd(),
              '../../packages/graphql-schema-gen/schema.gen.ts',
            )
          : undefined,
        outputAs: 'class',
      },
      context: ({ req }) => ({ ...req }),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Course,
        Quiz,
        CoursePage,
        QuizPage,
        Question,
        Answer,
        CourseProgress,
        QuizProgress,
      ],
      synchronize: Boolean(process.env.DATABASE_SYNC_SCHEMA),
    }),
    UserModule,
    AnswerModule,
    QuizModule,
    CourseModule,
    CourseProgressModule,
    QuizProgressModule,
  ],
  providers: [],
})
export class AppModule {}

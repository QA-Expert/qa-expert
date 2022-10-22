import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CourseProgressModule } from './modules/course-progresses/course-progress.module';
import { CourseModule } from './modules/courses/course.module';
import { QuizProgressModule } from './modules/quiz-progresses/quiz-progress.module';
import { QuizModule } from './modules/quizzes/quiz.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { QuizPageModule } from './modules/quiz-pages/quiz-page.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerModule } from './modules/answers/answer.module';
import { QuestionModule } from './modules/questions/question.module';
import { CoursePageModule } from './modules/course-pages/course-page.module';

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
      context: ({ req, res }) => ({ req, res }),
      sortSchema: true,
      cors: {
        origin: true,
        credentials: true,
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/qa-school'),
    AnswerModule,
    QuestionModule,
    UserModule,
    QuizProgressModule,
    QuizModule,
    CoursePageModule,
    CourseModule,
    CourseProgressModule,
    QuizPageModule,
  ],
  providers: [],
})
export class AppModule {}

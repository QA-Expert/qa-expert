import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from './modules/answers/answer.module';
import { CoursProgressModule } from './modules/cours-progresses/cours-progress.module';
import { CoursrModule } from './modules/courses/cours.module';
import { QuizProgressModule } from './modules/quiz-progresses/quiz-progress.module';
import { QuizModule } from './modules/quizzes/quiz.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Cours } from './modules/courses/cours.entity';
import { Quiz } from './modules/quizzes/quiz.entity';
import { CoursPage } from './modules/cours-pages/cours-page.entity';
import { QuizPage } from './modules/quiz-pages/quiz-page.entity';
import { Question } from './modules/questions/question.entity';
import { Answer } from './modules/answers/answer.entity';
import { CoursProgress } from './modules/cours-progresses/cours-progress.entity';
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
        Cours,
        Quiz,
        CoursPage,
        QuizPage,
        Question,
        Answer,
        CoursProgress,
        QuizProgress,
      ],
      synchronize: Boolean(process.env.DATABASE_SYNC_SCHEMA),
    }),
    UserModule,
    AnswerModule,
    QuizModule,
    CoursrModule,
    CoursProgressModule,
    QuizProgressModule,
  ],
  providers: [],
})
export class AppModule {}

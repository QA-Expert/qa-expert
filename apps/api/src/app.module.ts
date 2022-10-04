import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Answer } from './modules/answers/answer.entity';
import { AnswerModule } from './modules/answers/answer.module';
import { CoursPage } from './modules/cours-pages/cours-page.entity';
import { CoursProgress } from './modules/cours-progresses/cours-progress.entity';
import { CoursProgressModule } from './modules/cours-progresses/cours-progress.module';
import { Cours } from './modules/courses/cours.entity';
import { CoursrModule } from './modules/courses/cours.module';
import { Question } from './modules/questions/question.entity';
import { QuizPage } from './modules/quiz-pages/quiz-page.entity';
import { QuizProgress } from './modules/quiz-progresses/quiz-progress.entity';
import { QuizProgressModule } from './modules/quiz-progresses/quiz-progress.module';
import { Quiz } from './modules/quizzes/quiz.entity';
import { QuizModule } from './modules/quizzes/quiz.module';
import { User } from './modules/users/user.entity';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        '../../packages/graphql-schema/schema.gen.gql',
      ), // TODO: put under env
      definitions: {
        // TODO: put under env
        path: join(
          process.cwd(),
          '../../packages/graphql-schema/schema.gen.ts',
        ),
        outputAs: 'class',
      },
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // TODO: put under env
      port: 3306,
      username: 'root', // TODO: put under env
      password: 'zxypt!4F', // TODO: put under env
      database: 'qa-school', // TODO: put under env
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
      synchronize: true, // TODO: put under env. IMPORTANT - if we keep it in prod it will drop all of the data when shema changes
    }),
    UserModule,
    AnswerModule,
    QuizModule,
    CoursrModule,
    CoursProgressModule,
    QuizProgressModule,
  ],
})
export class AppModule {}

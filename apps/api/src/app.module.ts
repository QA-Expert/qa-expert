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
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zxypt!4F',
      database: 'qa-school',
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
      synchronize: true,
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

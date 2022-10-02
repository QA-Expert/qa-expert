import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Answer } from './modules/answers/answers.entity';
import { CoursPage } from './modules/course-pages/entities/course-page.entity';
import { Cours } from './modules/courses/entities/course.entity';
import { Question } from './modules/questions/questions.entity';
import { QuizPage } from './modules/quiz-pages/quiz-page.entity';
import { Quiz } from './modules/quizzes/quiz.entity';
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
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [User, Cours, CoursPage, Quiz, QuizPage, Question, Answer],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}

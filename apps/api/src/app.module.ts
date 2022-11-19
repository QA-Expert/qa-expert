import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CourseModule } from './modules/courses/course.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerModule } from './modules/answers/answer.module';
import { QuestionModule } from './modules/questions/question.module';
import { PageModule } from './modules/pages/page.module';
import { PageProgressModule } from './modules/page-progresses/page-progress.module';
import { BadgeModule } from './modules/badge/badge.module';

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
      autoSchemaFile: true,
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
    CourseModule,
    PageModule,
    PageProgressModule,
    BadgeModule,
  ],
  providers: [],
})
export class AppModule {}

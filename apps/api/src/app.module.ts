import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CourseModule } from './modules/courses/course.module';
import { UserModule } from './modules/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerModule } from './modules/answers/answer.module';
import { QuestionModule } from './modules/questions/question.module';
import { PageModule } from './modules/pages/page.module';
import { PageProgressModule } from './modules/page-progresses/page-progress.module';
import { BadgeModule } from './modules/badges/badge.module';
import { SubmittedProgressModule } from './modules/submitted-progresses/submitted-progress.module';
import { CourseProgressModule } from './modules/course-progresses/course-progress.module';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.authSecret,
        signOptions: {
          expiresIn: configService.authTokenExpiresIn,
        },
      }),
      inject: [ConfigService],
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const host = configService.dbHost;
        const port = configService.dbPort;
        const dbName = configService.dbName;
        const password = configService.dbPassword;
        const username = configService.dbUsername;

        return {
          uri: `mongodb+srv://${username}:${password}@${host}:${port}/${dbName}`,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    AnswerModule,
    QuestionModule,
    UserModule,
    CourseModule,
    PageModule,
    PageProgressModule,
    BadgeModule,
    SubmittedProgressModule,
    CourseProgressModule,
  ],
  providers: [],
})
export class AppModule {}

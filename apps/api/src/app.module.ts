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
import { ApiConfigModule } from './modules/config/config.module';
import { ApiConfigService } from './modules/config/config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => ({
        secret: apiConfigService.authSecret,
        signOptions: {
          expiresIn: apiConfigService.authTokenExpiresIn,
        },
      }),
      inject: [ApiConfigService],
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
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => {
        const host = apiConfigService.dbHost;
        const port = apiConfigService.dbPort;
        const dbName = apiConfigService.dbName;

        console.log(`mongodb://${host}:${port}/${dbName}`);
        return {
          uri: `mongodb://${host}:${port}/${dbName}`,
        };
      },
      inject: [ApiConfigService],
    }),
    ApiConfigModule,
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

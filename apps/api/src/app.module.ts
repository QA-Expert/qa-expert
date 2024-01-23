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
import { ActivityModule } from './modules/activities/activity.modules';
import { AddressModule } from './modules/billing/address/address.modules';
import { CreditCardModule } from './modules/billing/credit-card/credit-card.modules';
import { TransactionModule } from './modules/billing/transactions/transaction.modules';
import { AnswerValidationModule } from './modules/answer-validation/answer-validation.module';
import { EmailModule } from './modules/emails/email.module';
import { ClaimedBadgeModule } from './modules/claimed-badges/claimed-badge.modules';
import { CourseLikeModule } from './modules/course-likes/course-likes.modules';

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
      useFactory: (configService: ConfigService) => ({
        uri: configService.dbUri,
        connectionFactory: (connection: any) => {
          connection.on('error', (error: any) => {
            console.error('Failed to connect to Database ', error);
          });

          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    AnswerModule,
    AnswerValidationModule,
    QuestionModule,
    UserModule,
    CourseModule,
    PageModule,
    PageProgressModule,
    BadgeModule,
    SubmittedProgressModule,
    CourseProgressModule,
    ActivityModule,
    CreditCardModule,
    AddressModule,
    TransactionModule,
    EmailModule,
    ClaimedBadgeModule,
    CourseLikeModule,
  ],
  providers: [],
})
export class AppModule {}

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
import { PaymentMethodModule } from './modules/billing/payment-method/payment-method.modules';
import { SubscriptionModule } from './modules/billing/subscription/subscription.modules';
import { AnswerValidationModule } from './modules/answer-validation/answer-validation.module';
import { EmailModule } from './modules/emails/email.module';
import { ClaimedBadgeModule } from './modules/claimed-badges/claimed-badge.modules';
import { CourseLikeModule } from './modules/course-likes/course-likes.modules';
import { PaymentProviderModule } from './modules/billing/payment-provider/payment-provider.modules';
import { EncryptionModule } from './modules/encryption/encryption.modules';

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
    // @NOTE: order of modules matters
    // first modules in order are usually the ones that have forwardRef of underlying modules in case of circular dependencies
    ConfigModule,
    EncryptionModule,
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
    SubscriptionModule,
    PaymentProviderModule,
    PaymentMethodModule,
    EmailModule,
    ClaimedBadgeModule,
    CourseLikeModule,
  ],
  providers: [],
})
export class AppModule {}

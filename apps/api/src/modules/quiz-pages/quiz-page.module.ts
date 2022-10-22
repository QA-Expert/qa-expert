import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { QuizPage, QuizPageSchema } from './quiz-page.schema';
import { QuizPageResolver } from './quiz-page.resolver';
import { QuizProgressModule } from '../quiz-progresses/quiz-progress.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizPage.name, schema: QuizPageSchema },
    ]),
    UserModule,
    QuizProgressModule,
  ],
  providers: [QuizPageResolver, JwtService],
  exports: [],
})
export class QuizPageModule {}

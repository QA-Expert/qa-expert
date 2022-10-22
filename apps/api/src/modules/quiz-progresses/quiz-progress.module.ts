import { Module } from '@nestjs/common';
import { QuizProgressService } from './quiz-progress.service';
import { QuizProgressResolver } from './quiz-progress.resolver';
import { QuizProgress, QuizProgressSchema } from './quiz-progress.schema';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizProgress.name, schema: QuizProgressSchema },
    ]),
    UserModule,
  ],
  providers: [QuizProgressService, QuizProgressResolver, JwtService],
  exports: [QuizProgressService],
})
export class QuizProgressModule {}

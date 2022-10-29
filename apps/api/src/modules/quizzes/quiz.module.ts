import { forwardRef, Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';
import { Quiz, QuizSchema } from './quiz.schema';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizProgressModule } from '../quiz-progresses/quiz-progress.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    UserModule,
    QuizProgressModule,
  ],
  providers: [QuizService, QuizResolver, JwtService],
  exports: [],
})
export class QuizModule {}

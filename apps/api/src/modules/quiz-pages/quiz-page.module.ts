import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { QuizPage } from './quiz-page.entity';
import { QuizPageResolver } from './quiz-page.resolver';
import { QuizProgressModule } from '../quiz-progresses/quiz-progress.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizPage]),
    UserModule,
    QuizProgressModule,
  ],
  providers: [QuizPageResolver, JwtService],
  exports: [],
})
export class QuizPageModule {}

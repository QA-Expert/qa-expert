import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizProgressService } from './quiz-progress.service';
import { QuizProgressResolver } from './quiz-progress.resolver';
import { QuizProgress } from './quiz-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizProgress])],
  providers: [QuizProgressService, QuizProgressResolver],
  exports: [],
})
export class QuizProgressModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizProgressService } from './quiz-progress.service';
import { QuizProgressResolver } from './quiz-progress.resolver';
import { QuizProgress } from './quiz-progress.entity';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([QuizProgress]), UserModule],
  providers: [QuizProgressService, QuizProgressResolver, JwtService],
  exports: [QuizProgressService],
})
export class QuizProgressModule {}

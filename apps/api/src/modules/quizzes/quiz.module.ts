import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';
import { Quiz } from './quiz.entity';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), UserModule],
  providers: [QuizService, QuizResolver, JwtService],
  exports: [],
})
export class QuizModule {}

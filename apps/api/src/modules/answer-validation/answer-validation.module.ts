import { Module } from '@nestjs/common';
import { AnswerValidationService } from './answer-validation.service';
import { AnswerModule } from '../answers/answer.module';
import { AnswerValidationResolver } from './answer-validation.resolver';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, AnswerModule],
  providers: [AnswerValidationService, AnswerValidationResolver, JwtService],
  exports: [AnswerValidationService],
})
export class AnswerValidationModule {}

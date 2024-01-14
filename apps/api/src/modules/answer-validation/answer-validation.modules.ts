import { Module } from '@nestjs/common';
import { AnswerValidationService } from './answer-validation.service';

@Module({
  imports: [],
  providers: [AnswerValidationService],
  exports: [AnswerValidationService],
})
export class AnswerValidationModule {}

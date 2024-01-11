import { Module } from '@nestjs/common';
import { UserModule } from '../../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.schema';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { CreditCardModule } from '../credit-card/credit-card.modules';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    UserModule,
    CreditCardModule,
  ],
  providers: [TransactionService, TransactionResolver, JwtService],
  exports: [TransactionService],
})
export class TransactionModule {}

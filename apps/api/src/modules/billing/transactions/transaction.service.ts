import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private model: Model<Transaction>,
  ) {}

  async findAll(userId: string) {
    return await this.model
      .find({
        user: {
          _id: userId,
        },
      })
      .exec();
  }
}

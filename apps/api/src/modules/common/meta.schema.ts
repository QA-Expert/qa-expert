import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Meta extends Document {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;
}

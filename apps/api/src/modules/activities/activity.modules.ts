import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './activity.schema';
import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
    UserModule,
  ],
  providers: [ActivityService, ActivityResolver, JwtService],
  exports: [ActivityService],
})
export class ActivityModule {}

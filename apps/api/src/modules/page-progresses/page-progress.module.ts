import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PageProgress, PageProgressSchema } from './page-progress.schema';
import { PageProgressService } from './page-progress.service';
import { PageProgressResolver } from './page-progress.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PageProgress.name, schema: PageProgressSchema },
    ]),
    UserModule,
  ],
  providers: [PageProgressService, PageProgressResolver, JwtService],
  exports: [PageProgressService],
})
export class PageProgressModule {}

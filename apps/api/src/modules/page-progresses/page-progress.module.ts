import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PageProgress, PageProgressSchema } from './page-progress.schema';
import { PageProgressService } from './page-progress.service';
import { PageProgressResolver } from './page-progress.resolver';
import { CourseProgressModule } from '../course-progresses/course-progress.module';
import { SubmittedProgressModule } from '../submitted-progresses/submitted-progress.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PageProgress.name, schema: PageProgressSchema },
    ]),
    ConfigModule,
    UserModule,
    forwardRef(() => CourseProgressModule),
    SubmittedProgressModule,
  ],
  providers: [PageProgressService, PageProgressResolver, JwtService],
  exports: [PageProgressService],
})
export class PageProgressModule {}

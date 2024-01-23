import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseLike, CourseLikeSchema } from './course-likes.schema';
import { CourseLikeService } from './course-likes.service';
import { CourseLikeResolver } from './course-likes.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseLike.name, schema: CourseLikeSchema },
    ]),
    UserModule,
  ],
  providers: [CourseLikeService, CourseLikeResolver, JwtService],
  exports: [CourseLikeService],
})
export class CourseLikeModule {}

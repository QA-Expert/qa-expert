import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursProgressService } from './cours-progress.service';
import { CoursProgressResolver } from './cours-progress.resolver';
import { CoursProgress } from './cours-progress.entity';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CoursProgress]), UserModule],
  providers: [CoursProgressService, CoursProgressResolver],
  exports: [],
})
export class CoursProgressModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursProgressService } from './cours-progress.service';
import { CoursProgressResolver } from './cours-progress.resolver';
import { CoursProgress } from './cours-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursProgress])],
  providers: [CoursProgressService, CoursProgressResolver],
  exports: [],
})
export class CoursProgressModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursService } from './cours.service';
import { CoursResolver } from './cours.resolver';
import { Cours } from './cours.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cours])],
  providers: [CoursService, CoursResolver],
  exports: [],
})
export class CoursrModule {}

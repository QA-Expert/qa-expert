import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursService } from './cours.service';
import { CoursResolver } from './cours.resolver';
import { Cours } from './cours.entity';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Cours]), UserModule],
  providers: [CoursService, CoursResolver, JwtService],
  exports: [],
})
export class CoursrModule {}

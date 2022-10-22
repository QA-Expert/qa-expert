import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
  ) {}

  async findById(id: string) {
    return await this.courseModel.findById(id);
  }

  async findAll() {
    return await this.courseModel.find().exec();
  }
}

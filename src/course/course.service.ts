import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course/course.schema';
import { Model } from 'mongoose';

const coursesData = [
  {
    title: 'Introduction to Programming',
    description: 'This course covers the basics of programming.',
    students: [],
  },
  {
    title: 'Advanced Web Development',
    description: 'A deep dive into web technologies.',
    students: [],
  },
  {
    title: 'Not Advanced Web Development',
    description: 'A shallower deep dive into web programming.',
    students: [],
  },
  {
    title: 'Even More Not Advanced Web Development',
    description: 'A not so deep dive into web technologies.',
    students: [],
  },
];

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
  ) {}

  async getAll(): Promise<any> {
    return this.courseModel.find().exec();
  }

  async getCourseById(id: string): Promise<any> {
    return this.courseModel.findById(id).exec();
  }
  async populate(): Promise<string> {
    try {
      for (const courseData of coursesData) {
        const newCourse = new this.courseModel(courseData);
        await newCourse.save();
        console.log(`Course "${courseData.title}" added successfully`);
      }

      console.log('All courses added successfully');

      return 'All courses added successfully';
    } catch (error) {
      console.error('Error adding courses:', error);
      return 'Failed to add courses';
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user/user.schema';
import { EnrollUserDto } from './dto/enroll-user.dto';
import { CourseService } from 'src/course/course.service';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private courseService: CourseService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async getUserCourses({ userId }: Partial<EnrollUserDto>): Promise<string[]> {
    const user = await this.userModel
      .findById(userId)
      .populate('enrolledCourses')
      .exec();
    if (!user) throw new Error('User not found');

    return user.enrolledCourses;
  }

  async enrollUser({ userId, courseId }: EnrollUserDto): Promise<void> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new Error('User not found');

    const course = await this.courseService.getCourseById(courseId);
    if (!course) throw new Error('Course not found');

    // Add user ID to the course's students array
    course.students.push(userId);
    await course.save();

    // Add course ID to the user's enrolledCourses array
    user.enrolledCourses.push(courseId);
    await user.save();
  }
}

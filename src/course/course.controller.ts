import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('')
  getAll(): Promise<any[]> {
    return this.courseService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getCourseById(@Param('id') id: string): Promise<string> {
    return this.courseService.getCourseById(id);
  }
  @Get('populate')
  populate(): Promise<string> {
    return this.courseService.populate();
  }
}

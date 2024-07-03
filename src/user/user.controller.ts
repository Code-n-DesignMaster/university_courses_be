import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('courses/:userId')
  async courses(
    @Param('userId') userId: string,
    @Req() req: Request,
  ): Promise<string[]> {
    console.log('req', req);

    return this.userService.getUserCourses({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':courseId/enroll/:userId')
  async enrollUser(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.userService.enrollUser({ userId, courseId });
  }
}

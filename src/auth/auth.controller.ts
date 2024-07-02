import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request) {
    return req.user;
  }
  // login(@Body() authLoginDto: AuthLoginDto): Promise<any> {
  //   return this.authService.login(authLoginDto);
  // }
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ name, password }: AuthLoginDto): Promise<any> {
    const user = await this.userService.findOne(name);
    if (user && user.password === password) {
      const { password: pass, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, password: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

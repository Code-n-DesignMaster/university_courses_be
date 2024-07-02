import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
const fakeUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
  },
  {
    id: 2,
    username: 'jack',
    password: 'password123',
  },
];
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthLoginDto): Promise<any> {
    const user = await this.userService.findOne(username);
    // const user = fakeUsers.find((user) => user.username === username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return this.jwtService.sign(result);
    }
    return null;
  }

  // async login(user: any) {
  //   const payload = { username: user.username, password: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}

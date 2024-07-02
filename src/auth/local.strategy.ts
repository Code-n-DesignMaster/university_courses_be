import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { log } from 'console';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate({ name, password }: AuthLoginDto): Promise<any> {
    console.log('local:', name, password);

    const user = await this.authService.validateUser({ name, password });
    if (!user) {
      console.log('Error');

      throw new UnauthorizedException();
    }
    return user;
  }
}

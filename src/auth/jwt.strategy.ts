import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWtPayload } from './interfaces/jwtPayload';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: UsersRepository) {
    super({
      secretOrKey: '123456',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWtPayload): Promise<User> {
    console.log(payload);
    const { username } = payload;
    console.log(username);
    const user: User = await this.usersRepository.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

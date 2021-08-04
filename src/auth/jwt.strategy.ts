import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWtPayload } from 'src/authorization/interfaces/jwtPayload';
import { AuthService } from './auth.service';
import { User } from './user.entity';

/* import { User } from './interfaces/user.interface'; */
import { UsersRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: UsersRepository) {
    super({
      secretOrKey: 'topscret1',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

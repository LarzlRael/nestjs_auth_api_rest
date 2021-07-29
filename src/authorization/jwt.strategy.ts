import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { JWtPayload } from './interfaces/jwtPayload';
import { User } from './interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('Users') private authModel: Model<User>){
    super({
      secretOrKey: 'topscret1',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    });
  }

  async validate(payload: JWtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.authModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWtPayload } from './interfaces/jwtPayload';
@Injectable()
export class AuthorizationService {
  constructor(@InjectModel('Users') private authModel: Model<User>,
  private jwtService:JwtService,
  ) {}

  async createUser(authCredential: AuthCredentialDTO): Promise<void> {
    const { username, password } = authCredential;
    const salt = await bcrypt.genSalt();
    const hashedPassowrd = await bcrypt.hash(password, salt);

    const user = new this.authModel({
      username,
      password: hashedPassowrd,
    });
    try {
      await user.save();
    } catch (error) {
      console.log('error linea duplicada');
      console.log(error);
    }
  }

  async getUsers(): Promise<User[]> {
    return await this.authModel.find();
  }

  async signIn(authCredentialDto: AuthCredentialDTO):Promise<accessToken:string>{
    const {username,password} = authCredentialDto;
    const user = await this.authModel.findOne({username});

    if(user && bcrypt.compare(password, user.password)) {
      const payload ={ username };
      const accessToken:JWtPayload = await this.jwtService.sign(payload);
      return {accessToken};
    }else{
      throw new UnauthorizedException('please check your login credential'):
    }
  }
  
}

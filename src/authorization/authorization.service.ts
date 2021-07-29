import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthorizationService {
  constructor(@InjectModel('Users') private authModel: Model<User>) {}

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
}

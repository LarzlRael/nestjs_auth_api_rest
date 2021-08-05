import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    // hash

    const salt = await bcrypt.genSalt();
    const { username, password } = authCredentialDTO;

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate user
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
      console.log(error.code);
    }
  }
}

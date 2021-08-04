import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDTO } from 'src/authorization/dto/auth-credential.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWtPayload } from 'src/authorization/interfaces/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async singUp(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    return this.usersRepository.createUser(authCredentialDTO);
  }

  async singIn(
    authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDTO;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JWtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Pleas check your login credential');
    }
  }
}

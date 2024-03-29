import { Injectable } from '@nestjs/common';
/* import { UserResponse } from '../dist/authorization/interfaces/googleResponse.interface'; */

@Injectable()
export class AppService {
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
  getHello(): string {
    return 'Hello World!';
  }
}

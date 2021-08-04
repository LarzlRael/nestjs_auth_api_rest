import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialDTO } from 'src/authorization/dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signup(@Body() authCredentialDTO: AuthCredentialDTO): Promise<void> {
    return this.authService.singUp(authCredentialDTO);
  }
  @Post('/signin')
  signin(
    @Body() authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.singIn(authCredentialDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}

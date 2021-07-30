import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { AuthorizationService } from './authorization.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('authorization')
export class AuthorizationController {
  constructor(private authService: AuthorizationService) {}

  @Post('/signup')
  async signup(@Body() authCredentialDTO: AuthCredentialDTO): Promise<void> {
    const user = await this.authService.createUser(authCredentialDTO);
  }
  @Get('/users')
  async getUsers(@Res() res) {
    const users = await this.authService.getUsers();
    return res.status(HttpStatus.OK).json({
      users,
    });
  }
  @Post('/signin')
  signIn(
    @Body() authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req, @Res() res) {
    console.log(req);
    return res.json({
      ok: true,
      message: 'ruta :D',
    });
  }
}

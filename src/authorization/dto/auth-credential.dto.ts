import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDTO {
  @IsString()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ' the password is too weak',
  })
  password: string;
}

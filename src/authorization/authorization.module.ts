import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({

      secret: 'topscret1',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  providers: [AuthorizationService, JwtStrategy],
  controllers: [AuthorizationController,PassportModule],
})
export class AuthorizationModule {}

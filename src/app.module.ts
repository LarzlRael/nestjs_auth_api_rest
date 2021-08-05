import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { GoogleStrategy } from './authorization/google.strategy';
import { FacebookStrategy } from './authorization/facebook.stategy';
import { MulterModule } from '@nestjs/platform-express';
import { AppGateway } from './app.gateway';
import { UsersModule } from './users/users.module';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { AuthModule } from './auth/auth.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_CNN_STRING, {
      useNewUrlParser: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nestjs_test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_js_test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthorizationModule,
    TasksModule,
    MulterModule.register({ dest: './files' }),
    UsersModule,
    AuthModule,
    AssetsModule,
  ],
  controllers: [AppController, AlertController],
  providers: [
    AppService,
    GoogleStrategy,
    FacebookStrategy,
    AppGateway,
    ChatGateway,
    AlertGateway,
  ],
})
export class AppModule {}

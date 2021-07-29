import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb://localhost/productos-nest-tutorial', {
      useNewUrlParser: true,
    }),
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

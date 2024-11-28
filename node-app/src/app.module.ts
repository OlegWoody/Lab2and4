import { Product } from './entities/product.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TagsModule } from './tags/tags.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pg',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    KeycloakConnectModule.register({
        authServerUrl: 'http://localhost:8080', 
        realm: 'oleg',
        clientId: 'nest-app', 
        secret: 'mcCTATAo3ptaYMaE2Zz8vAfTba0CWcQk',
      }),    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },     
    { provide: APP_GUARD, useClass: ResourceGuard }, 
    { provide: APP_GUARD, useClass: RoleGuard },     
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model/user.model';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/model/product.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/model/category.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.prod.env',
      validationSchema: Joi.object({
        // NODE_ENV: Joi.string().valid([]),
        DB_PORT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        USERNAME: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DB: Joi.string().required(),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      dialectOptions: { charset: 'utf8mb4', dateStrings: true, typeCast: true },
      synchronize: true,
      autoLoadModels: true,
      models: [User, Product, Category],
    }),
    UserModule,
    ProductModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(process.env.NODE_ENV);
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model/user.model';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : undefined,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev'),
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
      models: [User],
    }),
    UserModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}

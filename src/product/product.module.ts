import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/category/model/category.model';
import { Product } from './model/product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [SequelizeModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

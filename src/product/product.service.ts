import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  RegisterProductInput,
  RegisterProductOutput,
} from './dto/register-product.dto';
import { Product } from './model/product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private product: typeof Product) {}

  async registerProduct(
    input: RegisterProductInput,
  ): Promise<RegisterProductOutput> {
    try {
      const result = await this.product.create({ ...input });

      return {
        ok: true,
        message: '',
        result,
      };
    } catch (err) {
      return {
        ok: false,
        message: err,
        result: {},
      };
    }
  }
}

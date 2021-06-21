import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Category } from 'src/category/model/category.model';
import { User } from 'src/user/model/user.model';
import { ReadProductOutput } from './dto/read-product.dto';
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

  async getAll(): Promise<ReadProductOutput> {
    try {
      const result = await this.product.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt', 'is_deleted'],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt', 'is_deleted'],
            },
          },
        ],
        attributes: {
          include: [
            [
              Sequelize.literal(`\"category\".\"category_name\"`),
              'category_name',
            ],
            [Sequelize.literal(`\"user\".\"email\"`), 'partner_email'],
            [Sequelize.literal(`\"user\".\"role\"`), 'partner_role'],
            [Sequelize.literal(`\"user\".\"phone\"`), 'partner_phone'],
            [Sequelize.literal(`\"user\".\"address\"`), 'partner_address'],
          ],
        },
        raw: true,
      });

      return {
        ok: true,
        message: '',
        result,
      };
    } catch (err) {
      return {
        ok: false,
        message: err,
      };
    }
  }

  async getOne(param: { id: string }): Promise<ReadProductOutput> {
    try {
      const result = await this.product.findOne({
        where: { id: param.id },
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt', 'is_deleted'],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt', 'is_deleted'],
            },
          },
        ],
        attributes: {
          include: [
            [
              Sequelize.literal(`\"category\".\"category_name\"`),
              'category_name',
            ],
            [Sequelize.literal(`\"user\".\"email\"`), 'partner_email'],
            [Sequelize.literal(`\"user\".\"role\"`), 'partner_role'],
            [Sequelize.literal(`\"user\".\"phone\"`), 'partner_phone'],
            [Sequelize.literal(`\"user\".\"address\"`), 'partner_address'],
          ],
        },
        raw: true,
      });

      if (!result) {
        return {
          ok: false,
          message: null,
        };
      }

      return {
        ok: true,
        result,
      };
    } catch (err) {
      return {
        ok: false,
      };
    }
  }
}

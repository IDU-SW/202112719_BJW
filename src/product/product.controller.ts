import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Enum_User_Role } from 'src/user/dto/user-role.enum';
import { User } from 'src/user/model/user.model';
import { ReadProductOutput } from './dto/read-product.dto';
import {
  RegisterProductInput,
  RegisterProductOutput,
} from './dto/register-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('')
  sayHello() {
    return 'hello';
  }

  @Get('/all')
  async getAll() {
    const result = await this.productService.getAll();

    if (result.ok) return result;
  }

  @Get(':id')
  async getOne(@Param() param: { id: string }) {
    const result = await this.productService.getOne(param);

    if (result.ok) return result;
    else return { ok: false };
  }

  @Post('/register')
  async registerProduct(
    @Req() req: Request,
    @Body() input: RegisterProductInput,
  ): Promise<RegisterProductOutput> {
    const user: User =
      req['user'] && req['user'].hasOwnProperty('id') ? req['user'] : undefined;

    if (user.role !== Enum_User_Role.PARTNER) {
      //break;
      return {
        ok: false,
        message: 'Not Verifed Access',
      };
    }
    const result = await this.productService.registerProduct({
      ...input,
      user_id: user.id.toString(),
    });

    return {
      ...result,
    };
  }
}

import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Enum_User_Role } from 'src/user/dto/user-role.enum';

@Controller('product')
export class ProductController {
  @Get('')
  sayHello() {
    return 'hello';
  }

  @Post('/add')
  async addProduct(@Req() req: Request) {
    const isPartner =
      req['user'] &&
      req['user'].hasOwnProperty('role') &&
      req['user'].role === Enum_User_Role.PARTNER
        ? true
        : false;

    if (!isPartner) {
      //break;
      return;
    }

    if (isPartner) {
      //add product
      return;
    }

    return;
  }
}

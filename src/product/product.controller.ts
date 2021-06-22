import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiHeader,
  ApiHeaders,
  ApiOperation,
  ApiSecurity,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtUserInfo } from 'src/auth/interface/jwt-user-info.interface';
import { Enum_User_Role } from 'src/user/dto/user-role.enum';
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

  @ApiOperation({
    description: '전체 상품 리스트',
    summary: '상품 리스트',
  })
  @Get('/all')
  async getAll(@Request() req: Request) {
    const result = await this.productService.getAll();
    return result;
  }

  @ApiOperation({
    description: '상품 상세',
    summary: '상품 상세',
  })
  @Get(':id')
  async getOne(@Param() param: { id: string }) {
    const result = await this.productService.getOne(param);

    if (result.ok) return result;
    else return { ok: false };
  }

  @ApiOperation({
    description: '상품 등록(파트너만 가능)',
    summary: '상품 등록(파트너만 가능)',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/register')
  async registerProduct(
    @Req() req: Request,
    @Body() input: RegisterProductInput,
  ): Promise<RegisterProductOutput> {
    const user: JwtUserInfo = req['user'];

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

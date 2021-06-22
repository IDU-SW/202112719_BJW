import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserInput } from './dto/user-create.dto';
import { SignInInput, SignInOutput } from './dto/user-signIn.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('')
  sayHello() {
    console.log('hello');
    return 'hello';
  }

  @ApiOperation({
    description: '회원가입',
    summary: '회원가입',
  })
  @Post('signup')
  async signUp(@Res() res: Response, @Body() createUser: CreateUserInput) {
    const result = await this.userService.signUp(createUser);
    if (result.ok) {
      res.status(HttpStatus.OK).json(result);
    } else {
      res.status(HttpStatus.NOT_FOUND).json(HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({
    description: '로그인시 Jwt 부여',
    summary: '로그인',
  })
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Body() signInInput: SignInInput): Promise<SignInOutput> {
    return await this.userService.signIn(signInInput);
  }
}

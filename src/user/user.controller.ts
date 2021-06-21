import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
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
    description: '로그인',
    summary: '로그인',
  })
  @Post('signin')
  async signIn(@Body() signInInput: SignInInput): Promise<SignInOutput> {
    return await this.userService.signIn(signInInput);
  }
}

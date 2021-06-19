import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserInput } from './dto/user-create.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('')
  sayHello() {
    console.log('hello');
    return 'hello';
  }

  @Post('create')
  async createUser(@Res() res: Response, @Body() createUser: CreateUserInput) {
    const result = await this.userService.createUser(createUser);
    if (result.ok) {
      res.status(HttpStatus.OK).json(result);
    } else {
      res.status(HttpStatus.NOT_FOUND).json(HttpStatus.NOT_FOUND);
    }
  }
}

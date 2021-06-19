import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CoreOutput } from 'src/common/core-output.dto';
import { CreateUserInput, CreateUserOutput } from './dto/user-create.dto';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private user: typeof User) {}

  async checkUserEmail(
    input: Pick<CreateUserInput, 'email'>,
  ): Promise<CreateUserOutput> {
    try {
      const checkEmail = await this.user.findOne({
        where: { email: input.email },
        raw: true,
      });

      if (!checkEmail) {
        return {
          ok: true,
          message: '중복된 이메일이 없습니다.',
        };
      } else {
        return {
          ok: false,
          message: '중복된 이메일이 존재합니다.',
        };
      }
    } catch (err) {
      return {
        ok: false,
        message: err,
      };
    }
  }

  async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const isExistEmail = await this.checkUserEmail({ email: input.email });

      if (!isExistEmail.ok)
        return {
          ok: false,
          message: 'Error',
        };

      if (isExistEmail.ok) {
        const result = await this.user.create({ ...input }, { raw: true });
        return {
          ok: true,
          message: '성공',
          data: result,
        };
      }
    } catch (err) {
      return {
        ok: true,
        message: err,
      };
    }
  }
}

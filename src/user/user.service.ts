import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserInput, CreateUserOutput } from './dto/user-create.dto';
import { SignInInput, SignInOutput } from './dto/user-signIn.dto';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private user: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async findOneUser(
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

  async signUp(input: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const isExistEmail = await this.findOneUser({ email: input.email });

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
        ok: false,
        message: err,
      };
    }
  }

  async signIn(input: SignInInput): Promise<SignInOutput> {
    try {
      let passwordCheck: boolean = false;

      const user = await this.user
        .findOne({
          where: { email: input.email },
          attributes: {
            include: ['email', 'address', 'id', 'role', 'phone'],
          },
          raw: true,
        })
        .then((result) => {
          if (result.password === input.password) {
            passwordCheck = true;
          } else {
            passwordCheck = false;
          }
          return result;
        });

      if (!user) {
        return {
          ok: false,
          message: 'Not Verifed',
        };
      }

      if (!passwordCheck) {
        return {
          ok: false,
          message: 'Not Access',
        };
      }

      if (user && passwordCheck) {
        const token = await this.jwtService.sign(user, {
          secret: process.env.JWT_SECRET,
        });
        return {
          ok: true,
          message: 'ok',
          token: token,
        };
      }
    } catch {
      return {
        ok: false,
        message: 'error',
      };
    }
  }
}

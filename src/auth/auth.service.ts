import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/model/user.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private readonly user: typeof User) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.user.findOne({
      where: { email: email },
      raw: true,
    });

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}

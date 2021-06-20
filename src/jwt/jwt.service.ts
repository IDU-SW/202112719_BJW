import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { JwtSign } from './interface/jwt-sign.interface';
@Injectable()
export class JwtService {
  async sign(user: JwtSign): Promise<string> {
    try {
      const token = await sign({ ...user }, process.env.JWT_SECRET);

      return token;
    } catch (e) {
      console.log(e);
    }
  }

  async verifed(token: string) {
    const verified = verify(token, process.env.JWT_SECRET);
    return verified;
  }
}

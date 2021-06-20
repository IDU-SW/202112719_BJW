import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('authorization' in req.headers) {
      const token: string = req.headers['authorization'];
      const user = await this.jwtService.verifed(token.toString());

      if (typeof user === 'object' && user.hasOwnProperty('id')) {
        req['user'] = user;
      } else {
        return;
      }
    }
    next();
  }
}

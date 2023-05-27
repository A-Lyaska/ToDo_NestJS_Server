import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from './token.service';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const auth_token = req.headers['auth_token'] as string;
    if (!auth_token) {
      return res.status(401).json({ message: 'Вы неавторизованы' });
    }
    try {
      const userId = await this.tokenService.checkToken(auth_token);
      req['userId'] = userId;
      next();
    } catch (err) {
      console.error(err);
      return res.status(403).json({ message: 'Неправильный Token' });
    }
  }
}

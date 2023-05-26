import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from './token.service';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const value = req.headers['value'] as string;
    if (!value) {
      return res.status(401).json({ message: 'Вы неавторизованы' });
    }
    try {
      const userId = await this.tokenService.checkToken(value);
      req['userId'] = userId;
      next();
    } catch (err) {
      console.error(err);
      return res.status(403).json({ message: 'Неправильный Token' });
    }
  }
}

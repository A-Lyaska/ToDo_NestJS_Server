import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async logoutUser() {
    await this.tokenRepository.clear();
    return "Вы успешно вышли";
  }

  async checkToken(auth_token: string) {
    const identifiedToken = await this.tokenRepository.findOne({ where: { auth_token: auth_token } });
    if (!identifiedToken) {
      throw new NotFoundException('Неверный Token');
    }
    return identifiedToken.userId;
  }
}

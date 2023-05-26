import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {

    async logoutUser() {
        await Token.destroy();
        return "Вы успешно вышли"
    }

    async checkToken(value: string) {
        const identifiedToken = await Token.findOne({ where: { value: value } });
        if (!identifiedToken) {
            throw new NotFoundException('Неверный Token');
        }
        return identifiedToken.userId;
    }
}

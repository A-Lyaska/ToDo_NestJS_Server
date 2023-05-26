import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import UserDto from 'src/dto/user.dto';
import { Token } from 'src/entities/token.entity';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {

    async regUser(user: UserDto) {
        try{
            if (User.findOne({ where: { email: user.email } })) {
                throw new ConflictException('Пользователь с таким email уже существует')
            }
            if (User.findOne({ where: { login: user.login } })) {
                throw new ConflictException('Пользователь с таким логином уже существует')
            }
            const newUser = await User.create({
                ...user,
            });
            return newUser;
        } catch (error) {
            throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
        }
    }

    async loginUser(user: UserDto){
        const userExist = await User.findOne({ where: { login: user.login, password: user.password } });
        if (!userExist) {
            throw new NotFoundException('Неверный логин или пароль')
        }
        const tokenExist = await Token.findOne({ where: { userId: userExist.userId } });
        if (tokenExist) {
            return 'Ваш токен - ' + tokenExist.value;
        }
        const token = nanoid(20);
        const newToken = await Token.create({
            userId: userExist.userId,
            value: token,
        });
        return newToken.value;
    }
}

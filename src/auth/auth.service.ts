import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Token } from 'src/entities/token.entity';
import { nanoid } from 'nanoid';
import UserDto from 'src/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) {}

  async regUser(user: UserDto) {
    const existingUserByEmail = await this.userRepository.findOne({ where: { email: user.email } });
    if (existingUserByEmail) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const existingUserByLogin = await this.userRepository.findOne({ where: { login: user.login } });
    if (existingUserByLogin) {
      throw new ConflictException('Пользователь с таким логином уже существует');
    }

    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async loginUser(user: UserDto) {
    const userAuth = await this.userRepository.findOne({ where: { login: user.login, password: user.password } });
    if (!userAuth) {
      throw new NotFoundException('Неверный логин или пароль');
    }

    const tokenExist = await this.tokenRepository.findOne({ where: { userId: userAuth.userId } });
    if (tokenExist) {
      return 'Ваш токен - ' + tokenExist.auth_token;
    }

    const tokenauth_token = this.jwtService.sign({ userId: userAuth.userId });

    const newToken = new Token();
    newToken.auth_token = tokenauth_token;
    newToken.user = userAuth;

    await this.tokenRepository.save(newToken);

    return newToken.auth_token;
  }
}

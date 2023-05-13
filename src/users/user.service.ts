import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create_user.dto';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async createUser(user: CreateUserDto) {
        try{
            const newUser = await this.userRepository.create(user);
            await this.userRepository.save(newUser);
            return newUser;
        } catch (error) {
            throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}})
        return user;
    }
}
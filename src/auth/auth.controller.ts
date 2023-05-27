import {Body, Controller, Delete, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import CreateUserDto, { UserDto } from 'src/dto/user.dto';
import { TokenService } from 'src/token/token.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly tokenService: TokenService,) {}

    @Post('/reg')
    registration(@Body() user: UserDto) {
        return this.authService.regUser(user)
    }

    @Post('/login')
    async login(@Body() user: UserDto) {
        return await this.authService.loginUser(user);
    }

    @Post('/logout')
    async deleteAllTokens() {
        return await this.tokenService.logoutUser();
    }
}
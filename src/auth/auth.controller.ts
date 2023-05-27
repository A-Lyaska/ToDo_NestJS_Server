import {Body, Controller, Delete, Param, Post} from '@nestjs/common';
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

    @Post('/logout/:value')
    async deleteAllTokens(@Param('auth_token') auth_token: string) {
        return await this.tokenService.logoutUser(auth_token);
    }
}
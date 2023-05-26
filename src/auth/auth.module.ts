import { Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from 'src/token/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from 'src/entities/token.entity';
import  User from 'src/entities/user.entity';


@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  imports: []
})
export class AuthModule {}
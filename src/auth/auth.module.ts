import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(() => UserModule),
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
          expiresIn: '1h'
        }
      })
  ],
    exports: [
        AuthService ,
        JwtModule
    ]
})
export class AuthModule {}

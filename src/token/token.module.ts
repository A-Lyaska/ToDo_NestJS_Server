import { Module } from '@nestjs/common';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  controllers: [],
  exports:[TokenService],
})
export class TokenModule { }

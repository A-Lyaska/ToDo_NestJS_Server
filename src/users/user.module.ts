import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../entities/user.entity';
import { UsersService } from './user.service';
import { DatabaseModule } from 'src/modules/db.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 6000,
      username: 'postgres',
      password: 'qwerty10',
      database: 'todo',
      entities: [Todo],
      ssl: false,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}

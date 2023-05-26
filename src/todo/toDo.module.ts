import { MiddlewareConsumer, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Todo from '../entities/todo.entity';
import { TodosService } from './toDo.service';
import { TodosController } from './toDo.controller';
import { DatabaseModule } from 'src/modules/db.module';
import { AuthModule } from 'src/auth/auth.module';
import { CheckTokenMiddleware } from 'src/token/token.middleware';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports:[TokenModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .forRoutes(TodosController);
  }
}

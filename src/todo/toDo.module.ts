import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TodosService } from './toDo.service';
import { TodosController } from './toDo.controller';
import { CheckTokenMiddleware } from 'src/token/token.middleware';
import { TokenModule } from 'src/token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';

@Module({
  imports:[TokenModule, TypeOrmModule.forFeature([Todo])],
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

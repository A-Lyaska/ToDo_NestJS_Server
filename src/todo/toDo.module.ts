import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Todo from '../entities/todo.entity';
import { TodosService } from './toDo.service';
import { TodosController } from './toDo.controller';
import { DatabaseModule } from 'src/modules/db.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({

    imports: [TypeOrmModule.forFeature([Todo]), DatabaseModule, AuthModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

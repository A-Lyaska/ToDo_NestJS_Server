import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import CreateTodoDto from './db/dto/create.dto';
import { TodosService } from './toDo.service';
import { UpdateTodoDto } from './db/dto/update.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // get all todos
  @Get()
  getTodos() {
    return this.todosService.getAllTodos();
  }

  // get todo by id
  @Get(':id')
  getTodoById(@Param('id') id: number) {
    return this.todosService.getTodoById(id);
  }

  // create todo
  @Post()
  createTodo(@Body() todo: CreateTodoDto) {
    return this.todosService.createTodo(todo);
  }

  // update todo
  @Patch(':id')
  updatePost(@Param('id') id: number, @Body() todo: UpdateTodoDto) {
    return this.todosService.updateTodo(id, todo);
  }

  //delete todo
  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    this.todosService.deleteTodo(id);
    return 'Todo с id: {id} удалена';
  }

  //delete all todo
  @Delete()
  deleteAll() {
    this.todosService.deleteAll();
    return 'Все Todo удалены';
  }
}

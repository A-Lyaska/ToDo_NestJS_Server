import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import CreateTodoDto from '../dto/create_db.dto';
import { TodosService } from './toDo.service';
import { UpdateTodoDto } from '../dto/update_db.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  
  // get all todo
  @UseGuards(JwtAuthGuard)
  @Get()
  getTodos() {
    return this.todosService.getAllTodos();
  }

  // get todo by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTodoById(@Param('id') id: number) {
    return this.todosService.getTodoById(id);
  }

  // create todo
  @UseGuards(JwtAuthGuard)
  @Post()
  createTodo(@Body() todo: CreateTodoDto) {
    return this.todosService.createTodo(todo);
  }

  // update todo
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePost(@Param('id') id: number, @Body() todo: UpdateTodoDto) {
    return this.todosService.updateTodo(id, todo);
  }

  //delete todo
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    this.todosService.deleteTodo(id);
    return 'Todo с id: {id} удалена';
  }

  //delete all todo
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAll() {
    this.todosService.deleteAll();
    return 'Все Todo удалены';
  }
}

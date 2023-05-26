import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import CreateTodoDto from '../dto/create_db.dto';
import { TodosService } from './toDo.service';
import { UpdateTodoDto } from '../dto/update_db.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  
  // get all todo
  @Get()
  getTodos(@Req() req: Request) {
    return this.todosService.getAllTodos(req['userId']);
  }

  // get todo by id
  @Get(':id')
  getTodoById(@Req() req: Request, @Param('id') id: string) {
    return this.todosService.getTodoById(id, req['userId']);
  }

  // create todo
  @Post()
  createTodo(@Body() todo: CreateTodoDto, @Req() req: Request) {
    return this.todosService.createTodo(todo, req['userId']);
  }

  // update todo
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() todo: UpdateTodoDto, @Req() req: Request) {
    return this.todosService.updateTodo(id, todo, req['userId']);
  }

  //delete todo
  @Delete(':id')
  deleteTodo(@Param('id') id: string, @Req() req: Request) {
    this.todosService.deleteTodo(id, req['userId']);
    return 'Todo с id: {id} удалена';
  }

  //delete all todo
  @Delete()
  deleteAll(@Req() req: Request) {
    this.todosService.deleteAll(req['userId']);
    return 'Все Todo удалены';
  }
}

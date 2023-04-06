import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateTodoDto from './db/dto/create.dto';
import Todo from './db/todo.entity';
import { UpdateTodoDto } from './db/dto/update.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  // find all
  getAllTodos() {
    try {
      return this.todoRepository.find();
    } catch (error) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
    }
  }

  // find by id
  async getTodoById(id: number) {
    try {
      const todo = await this.todoRepository.findOne({ where: { id } });
      if (todo) {
        return todo;
      }
    } catch (error) {
      throw new HttpException(
        'Todo не найдено или не существует',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // create
  async createTodo(todo: CreateTodoDto) {
    try {
      const newTodo = await this.todoRepository.create(todo);
      await this.todoRepository.save(newTodo);
      return newTodo;
    } catch (error) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
    }
  }

  // update
  async updateTodo(id: number, post: UpdateTodoDto) {
    try {
      await this.todoRepository.update(id, post);
      const updatedTodo = await this.todoRepository.findOne({ where: { id } });
      if (updatedTodo) {
        return updatedTodo;
      }
    } catch (error) {
      throw new HttpException(
        'Todo не найдено или не существует',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // delete
  async deleteTodo(id: number) {
    try {
      return this.todoRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        'Todo не найдено или не существует',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteAll() {
    try {
      return this.todoRepository.clear();
    } catch (error) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
    }
  }
}

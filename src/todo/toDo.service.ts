import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateTodoDto from '../dto/create_db.dto';
import { UpdateTodoDto } from '../dto/update_db.dto';
import { Todo } from 'src/entities/todo.entity';

@Injectable()
export class TodosService {
  // find all
  async getAllTodos(userId: string) {
    try {
      return Todo.findAll({ where: { userId: userId } });
    } catch (error) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
    }
  }

  // find by id
  async getTodoById(id: string, userId: string) {
    try {
      const todo = await Todo.findOne({ where: { id: id, userId: userId } });
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
  async createTodo(todo: CreateTodoDto, userId: string) {
    try {
      const newTodo = await Todo.create({
        ...todo,
        userId: userId,
      });
      return newTodo;
    } catch (error) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
    }
  }

  // update
  async updateTodo(id: string, post: UpdateTodoDto, userId: string) {
    try {
      const updateTodo = await Todo.findOne({ where: { id: id, userId: userId } });
      await updateTodo.update({
        ...post,
      })
      if (updateTodo) {
        return updateTodo;
      }
    } catch (error) {
      throw new HttpException(
        'Todo не найдено или не существует',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // delete
  async deleteTodo(id: string, userId: string) {
    try {
      const deleting = await Todo.findOne({ where: { id: id, userId: userId } });
      await deleting.destroy();
      return "Todo успешно удалена";
    } catch (error) {
      throw new HttpException(
        'Todo не найдено или не существует',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //delete all
  async deleteAll(userId: string) {
    try {
      await Todo.destroy({ where: { userId: userId } });
      return "Все Todo успешно удалены";
    } catch (error) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
    }
  }
}

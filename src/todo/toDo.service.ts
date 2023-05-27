import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/create_db.dto';
import { UpdateTodoDto } from '../dto/update_db.dto';
import { Todo } from 'src/entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getAllTodos(userId: string) {
    try {
      return this.todoRepository.find({ where: { userId: userId } });
    } catch (error) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
    }
  }

  async getTodoById(id: string, userId: string) {
    try {
      const todo = await this.todoRepository.findOne({ where: { id: id, userId: userId } });
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

  async createTodo(todo: CreateTodoDto, userId: string) {
    try {
      const newTodo = this.todoRepository.create({
        ...todo,
        userId: userId,
      });
      await this.todoRepository.save(newTodo);
      return newTodo;
    } catch (error) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
    }
  }

  async updateTodo(id: string, post: UpdateTodoDto, userId: string) {
    try {
      const updateTodo = await this.todoRepository.findOne({ where: { id: id, userId: userId } });
      if (!updateTodo) {
        throw new HttpException(
          'Todo не найдено или не существует',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.todoRepository.update(id, post);
      return updateTodo;
    } catch (error) {
      throw new HttpException(
        'Todo не найдено или не существует',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteTodo(id: string, userId: string) {
    try {
      const deleting = await this.todoRepository.findOne({ where: { id: id, userId: userId } });
      if (!deleting) {
        throw new HttpException(
          'Todo не найдено или не существует',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.todoRepository.delete(id);
      return "Todo успешно удалена";
    } catch (error) {
      throw new HttpException(
        'Todo не найдено или не существует',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteAll(userId: string) {
    try {
      await this.todoRepository.delete({ userId: userId });
      return "Все Todo успешно удалены";
    } catch (error) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST);
    }
  }
}

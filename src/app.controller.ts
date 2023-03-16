import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { initDB } from './db';
import { ToDo } from './db/models/ToDo.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @initDB();
}

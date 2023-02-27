import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDB } from './db';
import ToDo from './db/models/ToDo.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

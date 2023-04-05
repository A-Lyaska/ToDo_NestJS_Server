import { NestFactory } from '@nestjs/core';
import { TodoModule } from './toDo.module';

async function bootstrap() {
  const app = await NestFactory.create(TodoModule);
  await app.listen(3000);
}
bootstrap();

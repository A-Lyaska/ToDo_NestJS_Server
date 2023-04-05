import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoController } from './toDo.controller';
import { TodoService } from './toDo.service';
import { DatabaseModule } from './DB/db.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}

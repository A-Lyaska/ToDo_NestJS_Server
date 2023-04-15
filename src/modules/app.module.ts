import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../db/db.module';
import { TodosModule } from '../todo/toDo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

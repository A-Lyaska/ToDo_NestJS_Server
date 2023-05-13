import { Module } from '@nestjs/common';
import { TodosModule } from '../todo/toDo.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    AuthModule,
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
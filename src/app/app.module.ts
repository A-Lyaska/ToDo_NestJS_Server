import { Module } from '@nestjs/common';
import { TodosModule } from '../todo/toDo.module';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import { DatabaseModule } from 'src/modules/db.module';


@Module({
  imports: [
    AuthModule,
    TodosModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
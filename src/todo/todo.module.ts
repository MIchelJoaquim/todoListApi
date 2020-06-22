import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { userEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity, userEntity])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}

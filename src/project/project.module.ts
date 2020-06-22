import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectEntity } from './project.entity';
import { TodoEntity } from 'src/todo/todo.entity';
import { userEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, TodoEntity, userEntity])] ,
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { userEntity } from './user/user.entity';
import { BaseService } from './shared/base.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-erro.filter';
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './todo/todo.entity';
import { ProjectModule } from './project/project.module';
import { ProjectEntity } from './project/project.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'todoList',
    entities: [userEntity, TodoEntity, ProjectEntity
    ],
    synchronize: true,
  }),UserModule, TodoModule, ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService, BaseService,{ provide: APP_FILTER, useClass: HttpErrorFilter}],

})
export class AppModule {

  constructor(private connection: Connection) {

    connection.connect();

  }
}

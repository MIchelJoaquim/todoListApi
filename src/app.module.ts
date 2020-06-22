import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { userEntity } from './user/user.entity';
import { BaseService } from './shared/base.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'todoList',
    entities: [userEntity, 
    ],
    synchronize: true,
  }),UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, BaseService,],

})
export class AppModule {

  constructor(private connection: Connection) {

    connection.connect();

  }
}

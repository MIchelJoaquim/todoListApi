import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { Repository } from 'typeorm';
import { TodoDto } from './todo.dto';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(TodoEntity) private repository: Repository<TodoEntity>){}

    baseRelation = [];

    async create(data: any){
        const todo = this.repository.create(data);
        return this.repository.save(todo);
    }

    async findByUser(userId: number){
        return this.repository.find({where : {userId : "userId"}});
    }

    async update(id: number, todo: Partial<any>){
        await  this.repository.update(id, todo);
        return this.repository.findOne(id);
    }

    async delete(id: number){
        return this.repository.delete(id);
    }
}

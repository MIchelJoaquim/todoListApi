import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
        return this.repository.find({where : {"userId" : userId}});
    }

    async update(id: number, todo: Partial<any>, userId: number){
        const todoObject = await this.repository.findOne(id);
        this.isOwner(todoObject, userId);
        await  this.repository.update(id, todo);
        return this.repository.findOne(id);
    }

    async delete(id: number, userId: number){
        const todoObject = await this.repository.findOne(id);
        this.isOwner(todoObject, userId);
        return this.repository.delete(id);
    }

    private isOwner(todo : TodoEntity, userId: number){
        
        if(todo.user.id === userId){
            throw new HttpException('Incorrect user', HttpStatus.FORBIDDEN);
        }
    }
}

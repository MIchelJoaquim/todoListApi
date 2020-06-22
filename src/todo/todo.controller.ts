import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('api/todo')
export class TodoController {

    constructor(private todoService: TodoService){}

    @Get(':id/user')
    findByUser(@Param('id') id){
        return this.todoService.findByUser(id);
    }


    @Post('')
    create(@Body() todo: TodoDto){
        return this.todoService.create(todo);
    }

    @Put(':id')
    update(@Body() todo: TodoDto, @Param('id') id){
        return this.todoService.update(id, todo);
    }

    @Delete(':id')
    delete(@Param('id') id){
        return this.todoService.delete(id);
    }
}

import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from 'src/user/user.decorator';

@Controller('api/todo')
export class TodoController {

    constructor(private todoService: TodoService){}

    @Get()
    @UseGuards(new AuthGuard())
    findByUser(@User('id') id : number){
        return this.todoService.findByUser(id);
    }


    @Post('')
    create(@Body() todo: TodoDto){
        return this.todoService.create(todo);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    update(@Body() todo: TodoDto, @Param('id') id, @User('id') userId: number){
        return this.todoService.update(id, todo, userId);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id, @User('id') userId: number){
        return this.todoService.delete(id, userId);
    }
}

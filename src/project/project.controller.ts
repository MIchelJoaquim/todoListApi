import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './project.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from 'src/user/user.decorator';

@Controller('api/project')
export class ProjectController {

    constructor(private projectService: ProjectService){}

    @Get()
    @UseGuards(new AuthGuard())
    findByUser(@User('id') userId){
        console.log('user => '+userId);
        return this.projectService.findByUser(userId);
    }

    @Post()
    @UseGuards(new AuthGuard())
    create(@Body() project: any){
        return this.projectService.create(project);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    update(@Body() project: Partial<ProjectDto>, @Param('id') id: number, @User('id') userId){
        // console.log(project);
        return this.projectService.update(id, project, userId);
    }

    @Delete('id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id, @User('id') userId: number){
        return this.projectService.delete(id, userId); 
    }
}

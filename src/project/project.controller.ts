import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './project.dto';

@Controller('api/project')
export class ProjectController {

    constructor(private projectService: ProjectService){}

    @Get(':id')
    findByUser(@Param('id') id: number){
        return this.projectService.findByUser(id);
    }

    @Post()
    create(@Body() project: any){
        return this.projectService.create(project);
    }

    @Put(':id')
    update(@Body() project: ProjectDto, @Param('id') id: number){
        return this.projectService.update(id, project);
    }

    @Delete('id')
    delete(@Param('id') id){
        return this.projectService.delete(id); 
    }
}

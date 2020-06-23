import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './project.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from 'src/user/user.decorator';

@Controller('api/project')
export class ProjectController {

    constructor(private projectService: ProjectService){}

    @Get(':id')
    @UseGuards(new AuthGuard())
    findByUser(@Param('id') id: number){
        // console.log(user);
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

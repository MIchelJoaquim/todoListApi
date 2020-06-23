import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { Repository } from 'typeorm';
import { userEntity } from 'src/user/user.entity';
import { TodoEntity } from 'src/todo/todo.entity';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(ProjectEntity) private repository: Repository<ProjectEntity>) { }

    private baseRelation = ['owner', 'participantes', 'todo'];
    
    async findByUser(ownerId: number) {
        return await this.repository.find({ where: {"ownerId" : ownerId} , relations: this.baseRelation});
    }

    async create(project: {
        title: string,
        description: string,
        owner: userEntity,
        participantes: [userEntity],
        date_init: Date,
        date_end: Date,
        status: boolean
    }) {

        project.participantes.push(project.owner)

        const pro = this.repository.create(project);
        return this.repository.save(pro);
    }

    async update(id: number, project: any, userId: number) {
        const projectSelect = await this.repository.findOne(id);
        this.isOwner(projectSelect, userId);
        
        this.repository.update(id, project);
        return this.repository.findOne(id);
    }

    async delete(id: number, userId: number) {
        const projectSelect = await this.repository.findOne(id);
        this.isOwner(projectSelect, userId);
        return this.repository.delete(id);
    }

    private isOwner(project: ProjectEntity, userId: number){
        if(project.ownerId !== userId){
            throw new HttpException('Incorrect User', HttpStatus.FORBIDDEN);
        }
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { Repository } from 'typeorm';
import { userEntity } from 'src/user/user.entity';
import { TodoEntity } from 'src/todo/todo.entity';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(ProjectEntity) private repository: Repository<ProjectEntity>) { }

    private baseRelation = ['owner', 'participantes', 'todo'];
    
    async findByUser(userId: number) {
        return this.repository.find({ where: [userId] , relations: this.baseRelation});
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

    async update(id: number, project: any) {
        this.repository.update(id, project);
        return this.repository.findOne(id);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }
}

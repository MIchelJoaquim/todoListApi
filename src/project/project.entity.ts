import { PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn, JoinTable, Entity, OneToMany } from "typeorm";
import { userEntity } from "src/user/user.entity";
import { TodoEntity } from "src/todo/todo.entity";

@Entity('project')
export class ProjectEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(type => userEntity)
    owner: userEntity;

    @ManyToMany(type => userEntity)
    @JoinTable({name : "project_has_user"})
    participantes: [userEntity]

    @OneToMany(type => TodoEntity, t => t.project)
    todo: [TodoEntity];

    @Column()
    date_init: Date;

    @Column()
    date_end: Date;
    
    @Column()
    status: boolean; 

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
    
}
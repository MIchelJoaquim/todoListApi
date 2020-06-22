import { PrimaryColumn, Column, ManyToOne, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { userEntity } from "src/user/user.entity";
import { ProjectEntity } from "src/project/project.entity";

@Entity('todo')
export class TodoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

    @Column()
    date_init: Date;
    
    @Column()
    date_end: Date; 

    @Column()
    status: boolean;

    @ManyToOne(type => userEntity)
    user: number;

    @ManyToOne(type => ProjectEntity)
    project : ProjectEntity;

}
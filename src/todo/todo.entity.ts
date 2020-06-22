import { PrimaryColumn, Column, ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { userEntity } from "src/user/user.entity";

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
}
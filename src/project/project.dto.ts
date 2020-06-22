import { userEntity } from "src/user/user.entity";
import { TodoEntity } from "src/todo/todo.entity";

export interface ProjectDto {
    id?: number;
    title: string;
    description: string;
    owner: userEntity;
    participantes: [userEntity];
    todo: [TodoEntity];
    date_init: Date;
    date_end: Date;
    status: boolean;
}
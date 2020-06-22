import { userEntity } from "src/user/user.entity";

export interface TodoDto{
    id?: number;
    descricao: string;
    date_init: Date;
    date_end: Date;
    status: boolean;
    user: userEntity;
}
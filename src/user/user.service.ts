import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { userEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { userDTO } from './user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {

    baseRelation = [];
    constructor(@InjectRepository(userEntity) private repository: Repository<userEntity>) { }

    async create(data: any) {
        const Categoria = this.repository.create(data);
        return this.repository.save(Categoria);
    }

    async login(user: userDTO) {
        const { username, password } = user;
        // let userRes = await this.repository.findOne({ where: { username }, relations: ["role"] });
        let userRes = await this.repository.findOne({ where: { username }, relations: this.baseRelation });
        // let userRes = await this.repository.findOne({
        //     where: { username },
        //     join: {
        //         alias: "user",
        //         leftJoinAndSelect: {
        //             "role": "user.role",
        //             "permissoes": "role.permissoes"
        //         }
        //     }
        // });
        // console.log(userRes);

        if (!userRes || !(await userRes.comparePassword(password))) {
            throw new HttpException("Username/Password Inválido", HttpStatus.UNAUTHORIZED);
        }

        return userRes.toResponseObject();
    }

    async findAll(pdvId: number) {
        return (await this.repository.find({where: [pdvId], relations: this.baseRelation })).map((user) => user.toResponseObject(true));
    }

    async findByToken(token: string) {

        let user: userEntity;
        try {

            jwt.verify(token, 'secret', function (err, decoded) {

                // se tudo estiver ok, salva no request para uso posterior
                // console.log("----------- WHOME -----------");
                // console.log(decoded);
                // console.log(err);
                user = decoded;

            });
            const { id, username } = user;
            return { id, username };
        } catch (error) {
            throw new  UnauthorizedException("token Inválido");
        }
    }

    async findOne(id: number) {
        return await (await this.repository.findOne({ where: {"id" : id}, relations: this.baseRelation })).toResponseObject(false);
    }

    async update(id: number, data: Partial<any>) {
        await this.repository.update(id, data);
        return this.repository.findOne({ id });
    }

    async delete(id: number) {
        return this.repository.delete({ id });
    }
}

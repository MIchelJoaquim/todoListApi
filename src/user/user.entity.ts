import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('user')
export class userEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashpassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string){
        return await bcrypt.compare(attempt, this.password);
    }

    private get token(){
        const {id, username} = this;
        // const role = this.role.descricao; 
        return jwt.sign(
            {id, username}, 
            "secret",
            {expiresIn: '30m'} 
            )
    }
    // @beforeAll()
    // async hashpassword() {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }

    toResponseObject(showToken: boolean = true) {
        const { id, username, token} = this;
        return showToken ? { id, username, token} : { id, username};
    }
}
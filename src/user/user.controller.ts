import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { userDTO } from './user.dto';
import { AuthGuard } from '../shared/auth.gaurd';
import { RolesGuard } from 'src/shared/role.gaurd';
import { Roles } from 'src/shared/role.decorator';

@Controller("api/user")
export class UserController {
    constructor(private service: UserService){}

    @Post("whome")
    whoMe(@Body() data: any){
        return this.service.findByToken(data.token);
    }

    @Get("all/:id")
    // @UseGuards(new AuthGuard())
    // @UseGuards(new RolesGuard())
    // @Roles("ADMIN")
    findAll(@Param("id") pdv: number){ 
        return this.service.findAll(pdv);
    }
   
    @Post('login')
    login(@Body() user: userDTO){
        return this.service.login(user);   
    }

    @Post('register')
    create(@Body() pessoa: {username: string, password: string}){
        return this.service.create(pessoa).catch((reason)=>{console.log(reason)});
    }

    @Get(":id")
    findOne(@Param("id") id: number){
        console.log(id)
        return this.service.findOne(id);
    }
}

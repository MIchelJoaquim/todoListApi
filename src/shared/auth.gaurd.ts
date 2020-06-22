import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

    async canActivate(
        context: ExecutionContext):
        Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(request.headers.authorizaion);
        
        if (!request.headers.authorization) {
            // console.log("entrou");
            return false;
        }
        // console.log("antes");

        return this.validateToken(request.headers.authorization);;
    }

    async validateToken(auth: string) {
        
        try {
            const decode = jwt.verify(auth, "secret");
            console.log(decode);
        } catch (error) {
            const msg = 'Token Inválido: ' + (error.message || error.name);
            throw new UnauthorizedException(msg);
        }

        return true;
    }

}
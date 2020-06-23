import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { decode } from "querystring";

@Injectable()
export class AuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // console.log(request.headers.authorizaion);
        
        if (!request.headers.authorization) {
            // console.log("entrou");
            return false;
        }
        // console.log("antes");

				const decoded = await this.validateToken(request.headers.authorization);
				// console.log(decoded);
				request.user = decoded;
				// console.log(JSON.stringify(request.user)+"auth");
				context.switchToHttp().getRequest().user = decoded;
        return true;
    }

    async validateToken(auth: string) {
        
        try {
            const decode = await jwt.verify(auth, "secret");
            // console.log(decode);
            return decode;
        } catch (error) {
            const msg = 'Token Inválido: ' + (error.message || error.name);
            throw new HttpException(msg, HttpStatus.FORBIDDEN);
        }

    }

}
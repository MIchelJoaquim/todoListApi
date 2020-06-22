import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        // console.log(1);
        // let rolesAuth = ["adm", "fff"];
        // // const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        // console.log(request.headers.authorizaion);

        if (!request.headers.authorization) {
            // return request.status(401).send({ auth: false, message: 'No token provided.' })
            throw new UnauthorizedException("No token provided.");
        }
        // console.log(2);
        let isInvalidToken = true;

        var token = request.headers.authorization;

        try {
            jwt.verify(token, 'secret', function (err, decoded) {

                isInvalidToken = false;

                // se tudo estiver ok, salva no request para uso posterior
                // console.log(decoded);
                request.userId = decoded.id;

                let refletor = new Reflector();
                let roles = refletor.get<string[]>('roles', context.getHandler());
                if (!roles) {
                    return true;
                }   
                // console.log(4);

                let isFind = false;
                roles.forEach((role) => {
                    console.log(role + "===" + decoded.role.name)
                    if (role === decoded.role.name) {
                        isFind = true;
                    }

                });
                if (!isFind) {
                    throw new UnauthorizedException("Permissões insuficientes");
                }





            });
        } catch (error) {
            console.log("TOKEN ERRADO");
            // console.log(request);
            // return request.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            throw new HttpException("Token Inválido",HttpStatus.NOT_ACCEPTABLE);
            // throw new UnauthorizedException("Token Inválido!");
        }


        return true;
    }


}
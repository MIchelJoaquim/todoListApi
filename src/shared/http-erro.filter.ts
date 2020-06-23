import {Catch, ExceptionFilter, ArgumentsHost, Logger} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter{

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        const erroResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message.error || exception.message || null,
        }

        Logger.error(`${request.method} ${request.url}`, JSON.stringify(erroResponse), 'ExceptionFilter',);


        response.status(status).json(erroResponse);
    }
    
}
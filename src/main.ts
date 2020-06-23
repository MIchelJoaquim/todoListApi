import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import{ NestExpressApplication } from '@nestjs/platform-express'
import { RolesGuard } from './shared/role.gaurd';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { from } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Com Express
  // const app = await NestFactory.create<NestExpressApplication>(
  //   AppModule,
  // );
  
  app.enableCors();

  // app.use(function (req, res, next) {
  //   // res.header("Access-Control-Allow-Origin", "*");
  //   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   // res.header("Access-Control-Allow-Method", "*");

  //   // if (req.method == "OPTIONS") {
  //   //   res.writeHead(200, { "Content-Type": "application/json" });
  //   //   res.end();
  //   // }


  // if (req.url !== "/user/login") {
  //   var token = req.headers.authorization;
  //   console.log(req.url);
  //   if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  //   jwt.verify(token, 'secret', function (err, decoded) {
  //     console.log(token);
  //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

  //     // se tudo estiver ok, salva no request para uso posterior
  //     console.log(decoded);
  //     req.userId = decoded.id;
  //     // console.log(req);

  //     next();
  //   });
  // } else {
  //   next();
  // }


  // });
  const PORT = 3000;
  await app.listen(PORT);
  Logger.log('Server started: ' + PORT, 'main');

}
bootstrap();

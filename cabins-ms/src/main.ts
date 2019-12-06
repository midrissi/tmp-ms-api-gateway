import { NestFactory } from '@nestjs/core';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const api = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 5000,
    }
  });

  ClientsModule.register([
    { name: 'MATH_SERVICE', transport: Transport.TCP, options: {
      port: 5000,
    }},
  ]),
  app.listen(() => console.log('Microservice is listening'));
  api.listen(4000, () => console.log('server started'));
}
bootstrap();
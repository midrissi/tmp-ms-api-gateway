import { NestFactory } from '@nestjs/core';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 5000,
    },
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    /* TCP configuration *
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: process.env.PORT || 5000,
    }
    /**/

    /* Redis configuration *
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379'
    }
    /**/

    /* RMQ Configuration */
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cabins_queue',
      queueOptions: {
        durable: false,
      },
    },
    /**/
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();

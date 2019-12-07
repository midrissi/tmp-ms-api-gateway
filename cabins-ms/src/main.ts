import { NestFactory } from '@nestjs/core';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    /* TCP configuration *
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 5000
    }
    /**/

    /* Redis configuration *
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379'
    }
    /**/

    /* RMQ Configuration *
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cabins_queue',
      queueOptions: {
        durable: false,
      },
    },
    /**/
    /* gRPC configuration */
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5000',
      package: 'cabin',
      protoPath: join(__dirname, '..', 'protos/cabins/cabin.proto'),
    },
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
